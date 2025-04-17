import { WebinyError } from "@webiny/error";
import type { IResolverSQSRecord } from "../abstractions/ResolverRecord";
import { GetCommand, getDocumentClient } from "@webiny/aws-sdk/client-dynamodb/index.js";

export const createGetSourceItem = (input: IResolverSQSRecord) => {
    const client = getDocumentClient({
        region: input.body.region
    });

    return async () => {
        const cmd = new GetCommand({
            Key: {
                PK: input.body.PK,
                SK: input.body.SK
            },
            TableName: input.body.tableName
        });
        const result = await client.send(cmd);

        if (!result.Item) {
            throw new WebinyError({
                message: "Item not found.",
                data: {
                    PK: input.body.PK,
                    SK: input.body.SK,
                    tableName: input.body.tableName
                }
            });
        }
        return result.Item;
    };
};
