import { Plugin } from "@webiny/plugins";
import {
    createAfterDeployPlugin,
    createAfterDestroyPlugin
} from "@webiny/cli-plugin-deploy-pulumi/plugins/index.js";
import { DeleteCommand, getDocumentClient, PutCommand } from "@webiny/aws-sdk/client-dynamodb";
import { getSyncSystemOutput } from "@webiny/pulumi-aws/apps/syncSystem/getSyncSystemOutput.js";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils/index.js";

interface IGetStacksParams {
    env: string;
    variant: string | undefined;
}

const getStacks = async (params: IGetStacksParams) => {
    const { env, variant } = params;
    const syncSystem = getSyncSystemOutput({
        env
    });
    if (!syncSystem) {
        return {
            syncSystem: null
        };
    }
    const api = getStackOutput({
        env,
        variant,
        folder: "apps/api"
    });
    if (!api) {
        throw new Error("Could not retrieve API stack output.");
    }
    return {
        syncSystem,
        api
    };
};
/**
 * Note that the plugins will only have effect if the Sync System is deployed in same env as the API system.
 */
export const createSyncSystemPlugins = (): Plugin[] => {
    return [
        /**
         * After deployment of API system, we need to write the deployment information to the Sync System DynamoDB table.
         * This way Sync System will know which deployments exist.
         */
        createAfterDeployPlugin(async ({ env, variant }) => {
            const { syncSystem, api } = await getStacks({ env, variant });
            if (!syncSystem) {
                return;
            }
            const client = getDocumentClient({
                region: syncSystem.region
            });
            const tableName = syncSystem.dynamoDbName;
            if (!tableName) {
                throw new Error("Sync System DynamoDB table name is not defined.");
            }

            const cmd = new PutCommand({
                TableName: tableName,
                Item: {
                    PK: "DEPLOYMENTS",
                    SK: `${env}#${variant || "unknown"}`,
                    item: {
                        region: api.region,
                        s3Id: api.fileManagerBucketId,
                        s3Arn: api.fileManagerBucketArn,
                        primaryDynamoDbArn: api.primaryDynamodbTableArn,
                        primaryDynamoDbName: api.primaryDynamodbTableName,
                        primaryDynamoDbHashKey: api.primaryDynamodbTableHashKey,
                        primaryDynamoDbRangeKey: api.primaryDynamodbTableRangeKey
                    }
                }
            });
            try {
                await client.send(cmd);
            } catch (ex) {
                console.error("Error while writing to Sync System DynamoDB table.");
                console.log(ex.message);
                throw ex;
            }
        }),
        /**
         * After destroy of the deployment, we need to delete the deployment information from the Sync System DynamoDB table.
         */
        createAfterDestroyPlugin(async ({ env, variant }) => {
            const { syncSystem } = await getStacks({ env, variant });
            if (!syncSystem) {
                return;
            }
            const client = getDocumentClient({
                region: syncSystem.region
            });
            const tableName = syncSystem.dynamoDbName;
            if (!tableName) {
                throw new Error("Sync System DynamoDB table name is not defined.");
            }

            const cmd = new DeleteCommand({
                TableName: tableName,
                Key: {
                    PK: "DEPLOYMENTS",
                    SK: `${env}#${variant || "unknown"}`
                }
            });
            try {
                await client.send(cmd);
            } catch (ex) {
                console.error("Error while deleting from Sync System DynamoDB table.");
                console.log(ex.message);
                throw ex;
            }
        })
    ];
};
