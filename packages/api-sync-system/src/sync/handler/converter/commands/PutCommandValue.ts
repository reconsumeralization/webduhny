import { PutCommand } from "@webiny/aws-sdk/client-dynamodb";
import type { ICommandValue, ICommandValueItem } from "~/sync/types.js";
import type { NonEmptyArray } from "@webiny/api/types.js";

export interface IPutCommandValueParams extends Pick<PutCommand, "input"> {
    input: Pick<PutCommand["input"], "Item" | "TableName">;
}

export class PutCommandValue implements ICommandValue {
    public readonly command = "put";
    public readonly item: ICommandValueItem;

    public constructor(input: IPutCommandValueParams) {
        this.item = {
            command: this.command,
            PK: input.input.Item!.PK,
            SK: input.input.Item!.SK,
            tableName: input.input.TableName as string
        };
    }

    public getItems(): NonEmptyArray<ICommandValueItem> {
        return [this.item];
    }
}
