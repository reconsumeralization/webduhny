import type { BatchWriteCommand } from "@webiny/aws-sdk/client-dynamodb";
import type { ICommandValue, ICommandValueItem } from "~/sync/types.js";
import type { NonEmptyArray } from "@webiny/api/types.js";
import { getTableType } from "~/sync/utils/getTableType.js";

const convert = (items: ICommandValueItem[]): NonEmptyArray<ICommandValueItem> | null => {
    if (items.length === 0) {
        return null;
    }
    return items as NonEmptyArray<ICommandValueItem>;
};

export class BatchWriteCommandValue implements ICommandValue {
    public readonly command = "batchWrite";
    public readonly items: ICommandValueItem[] = [];

    public constructor(input: BatchWriteCommand) {
        for (const tableName in input.input.RequestItems) {
            const values = input.input.RequestItems[tableName];
            for (const value of values) {
                if (value.PutRequest?.Item) {
                    const item = value.PutRequest.Item;

                    this.items.push({
                        command: "put",
                        PK: item.PK,
                        SK: item.SK,
                        tableName,
                        tableType: getTableType(tableName)
                    });
                } else if (value.DeleteRequest?.Key) {
                    const item = value.DeleteRequest.Key;

                    this.items.push({
                        command: "delete",
                        PK: item.PK,
                        SK: item.SK,
                        tableName,
                        tableType: getTableType(tableName)
                    });
                }
            }
        }
    }

    public getItems(): NonEmptyArray<ICommandValueItem> | null {
        return convert(this.items);
    }
}
