const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument, GetCommand } = require("@aws-sdk/lib-dynamodb");

// Since Lambda@Edge doesn't support ENV variables, the easiest way to pass
// config values to it is to inject them into the source code before deploy.
const DB_TABLE_NAME = "{DB_TABLE_NAME}";
const DB_TABLE_REGION = "{DB_TABLE_REGION}";
const BLUE_GREEN_PARTITION_KEY = "{BLUE_GREEN_PARTITION_KEY}";
const BLUE_GREEN_SORT_KEY = "{BLUE_GREEN_SORT_KEY}";

let client;
try {
    client = new DynamoDBClient({
        region: DB_TABLE_REGION
    });
} catch (ex) {
    console.error("Could not establish connection to DynamoDB.");
    console.log(ex);
    throw ex;
}

const documentClient = DynamoDBDocument.from(client, {
    marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true
    }
});

async function getActiveSystem() {
    const cmd = new GetCommand({
        TableName: DB_TABLE_NAME,
        Key: {
            PK: BLUE_GREEN_PARTITION_KEY,
            SK: BLUE_GREEN_SORT_KEY
        }
    });

    const result = await documentClient.send(cmd);
    if (!result.Item?.value) {
        console.error("There is no Blue/Green system information.");
        return null;
    }
    let value;
    try {
        value = JSON.parse(result.Item.value);
    } catch (ex) {
        console.error("Failed to parse Blue/Green system information.");
        console.log(ex);
        throw new Error(`Could not fetch Blue/Green information from the DynamoDB.`);
    }
    if (!value?.primary) {
        throw new Error("Primary Blue/Green variant is not configured.");
    } else if (!value?.secondary) {
        throw new Error("Secondary Blue/Green variant is not configured.");
    }

    return {
        primary: value.primary,
        secondary: value.secondary
    };
}

function removeHttpOrHttps(input) {
    return input.replace("http://", "").replace("https://", "");
}

/**
 * We need to pass the request to currently active variant.
 */
async function handleOriginRequest(request) {
    const target = await getActiveSystem();
    /**
     * What do we do in case there is no active variant system?
     */
    if (!target.primary?.cloudfrontDomainName) {
        throw new Error(
            `Could not transfer the request to correct system - missing "cloudfrontDomainName".`
        );
    }

    const domainName = removeHttpOrHttps(target.primary.cloudfrontDomainName);

    const requestOriginCustom = structuredClone(request.origin.custom);

    request.origin = {
        custom: {
            ...requestOriginCustom,
            port: requestOriginCustom?.port || 443,
            protocol: requestOriginCustom?.protocol || "https",
            path: requestOriginCustom?.path || "",
            sslProtocols: requestOriginCustom?.sslProtocols || ["TLSv1.2"],
            readTimeout: requestOriginCustom?.readTimeout || 30,
            keepaliveTimeout: requestOriginCustom?.keepaliveTimeout || 5,
            customHeaders: requestOriginCustom?.customHeaders || {},
            domainName
        }
    };

    request.headers.host = [
        {
            value: domainName
        }
    ];

    return request;
}

exports.handler = async event => {
    const { request, config } = event.Records[0].cf;

    if (config.eventType === "origin-request") {
        try {
            return await handleOriginRequest(request);
        } catch (ex) {
            console.error(ex);
            return {
                status: 404,
                statusDescription: ex.message
            };
        }
    }

    return {
        status: 404,
        statusDescription: `Unknown event type: ${config.eventType}`
    };
};
