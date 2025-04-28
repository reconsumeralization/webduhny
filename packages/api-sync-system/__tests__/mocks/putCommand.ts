import { PutCommand } from "@webiny/aws-sdk/client-dynamodb/index.js";

export interface ICreateMockPutCommandParams {
    TableName?: string;
    Item?: Record<string, string>;
}

export const createMockPutCommand = (params: ICreateMockPutCommandParams = {}) => {
    return new PutCommand({
        TableName: params.TableName || "test",
        Item: params.Item || {
            PK: "p1",
            SK: "s1"
        }
    });
};
