import type { UpdateCommand } from "@webiny/aws-sdk/client-dynamodb";
import type { ICommandValue, ICommandValueItem } from "~/sync/types.js";
import type { NonEmptyArray } from "@webiny/api/types.js";
import { getTableType } from "~/sync/utils/getTableType.js";

export class UpdateCommandValue implements ICommandValue {
    public readonly command = "update";
    public readonly item: ICommandValueItem;

    public constructor(input: UpdateCommand) {
        const tableName = input.input.TableName as string;
        this.item = {
            command: this.command,
            PK: input.input.Key!.PK,
            SK: input.input.Key!.SK,
            tableName,
            tableType: getTableType(tableName)
        };
    }

    public getItems(): NonEmptyArray<ICommandValueItem> {
        return [this.item];
    }
}
