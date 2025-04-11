import { BatchWriteCommand } from "@webiny/aws-sdk/client-dynamodb";
import type { ICommandValue } from "~/sync/types.js";

export interface IBatchWriteCommandValueKeys {
    command: string;
    PK: string;
    SK: string;
}

export class BatchWriteCommandValue implements ICommandValue {
    public readonly command = "batchWrite";
    public readonly items: IBatchWriteCommandValueKeys[] = [];

    public constructor(input: BatchWriteCommand) {
        for (const key in input.input.RequestItems) {
            const values = input.input.RequestItems[key];
            for (const value of values) {
                if (value.PutRequest?.Item) {
                    const item = value.PutRequest.Item;

                    this.items.push({
                        command: "put",
                        PK: item.PK,
                        SK: item.SK
                    });
                } else if (value.DeleteRequest?.Key) {
                    const item = value.DeleteRequest.Key;

                    this.items.push({
                        command: "delete",
                        PK: item.PK,
                        SK: item.SK
                    });
                }
            }
        }
    }

    public toString(): string {
        return JSON.stringify({
            command: this.command,
            items: this.items
        });
    }
}
