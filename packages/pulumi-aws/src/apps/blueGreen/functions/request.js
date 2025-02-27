const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { BLUE_GREEN_PARTITION_KEY, BLUE_GREEN_SORT_KEY } = require("../constants");

// Since Lambda@Edge doesn't support ENV variables, the easiest way to pass
// config values to it is to inject them into the source code before deploy.
const DB_TABLE_NAME = "{DB_TABLE_NAME}";
const DB_TABLE_REGION = "{DB_TABLE_REGION}";

const client = new DynamoDBClient({
    region: DB_TABLE_REGION
});

const documentClient = DynamoDBDocument.from(client, {
    marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true
    }
});
async function getActiveSystem() {
    const cmd = new GetCommand({
        TableName: DB_TABLE_REGION,
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
        throw ex;
    }
    if (!value.primary) {
        throw new Error("Primary variant is not configured.");
    } else if (!value.secondary) {
        throw new Error("Secondary variant is not configured.");
    }

    return {
        primary: value.primary,
        secondary: value.secondary
    };
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
        // TODO throw an error? 404?
        console.error(
            `Primary variant is not configured or deployed - missing "cloudfrontDomainName".`
        );
        return request;
    }
    return {
        ...request,
        origin: {
            ...request.origin,
            domainName: target.primary.cloudfrontDomainName
        }
    };
}

exports.handler = async event => {
    const { request, config } = event.Records[0].cf;

    if (config.eventType !== "origin-request") {
        return request;
    }
    try {
        return await handleOriginRequest(request);
    } catch (ex) {
        console.error(ex);
    }
    return request;
};
