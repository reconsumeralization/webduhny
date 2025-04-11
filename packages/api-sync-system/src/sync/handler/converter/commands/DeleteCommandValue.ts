import { DeleteCommand } from "@webiny/aws-sdk/client-dynamodb";
import type { ICommandValue } from "~/sync/types.js";

export interface IDeleteCommandValueKeys {
    PK: string;
    SK: string;
}

export class DeleteCommandValue implements ICommandValue {
    public readonly command = "delete";
    public readonly keys: IDeleteCommandValueKeys;

    public constructor(input: DeleteCommand) {
        this.keys = {
            PK: input.input.Key!.PK,
            SK: input.input.Key!.PK
        };
    }

    public toString(): string {
        return JSON.stringify({
            command: this.command,
            keys: this.keys
        });
    }
}
