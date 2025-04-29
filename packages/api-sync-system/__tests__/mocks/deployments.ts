import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { PutCommand } from "@webiny/aws-sdk/client-dynamodb";
import type { IDeployment } from "~/resolver/deployment/types.js";

export interface ICreateDeploymentParams {
    client: DynamoDBDocument;
    tableName: string;
    item: ICreateMockDeploymentItem;
}

export const storeDeployment = async (params: ICreateDeploymentParams) => {
    const { client, item, tableName } = params;

    await client.send(
        new PutCommand({
            TableName: tableName,
            Item: {
                PK: `DEPLOYMENT#${item.env}#${item.variant || "unknown"}`,
                SK: `default`,
                GSI1_PK: "DEPLOYMENTS",
                GSI1_SK: `${item.env}#${item.variant || "unknown"}`,
                item
            }
        })
    );
};

export interface ICreateMockDeploymentItem {
    name: string;
    env: string;
    variant?: string;
    region: string;
    version: string;
    s3Id: string;
    s3Arn: string;
    primaryDynamoDbArn: string;
    primaryDynamoDbName: string;
    primaryDynamoDbHashKey: string;
    primaryDynamoDbRangeKey: string;
    elasticsearchDynamodbTableArn?: string;
    elasticsearchDynamodbTableName?: string;
}

export const createMockDeploymentData = (item: Partial<ICreateMockDeploymentItem> = {}) => {
    return {
        name: "test",
        env: "test",
        variant: "test",
        region: "us-east-1",
        version: "0.0.0",
        s3Id: "s3Id",
        s3Arn: "s3Arn",
        primaryDynamoDbArn: "primaryDynamoDbArn",
        primaryDynamoDbName: "primaryDynamoDbName",
        primaryDynamoDbHashKey: "primaryDynamoDbHashKey",
        primaryDynamoDbRangeKey: "primaryDynamoDbRangeKey",
        elasticsearchDynamodbTableArn: "elasticsearchDynamodbTableArn",
        elasticsearchDynamodbTableName: "elasticsearchDynamodbTableName",
        ...item
    };
};

export const createMockDeployment = (
    input: Partial<ICreateMockDeploymentItem> = {}
): IDeployment => {
    const item = createMockDeploymentData(input);
    return {
        ...item,
        services: {
            ...item
        }
    };
};
