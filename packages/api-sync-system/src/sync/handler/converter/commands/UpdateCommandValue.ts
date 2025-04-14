import { UpdateCommand } from "@webiny/aws-sdk/client-dynamodb";
import type { ICommandValue } from "~/sync/types.js";

export interface IUpdateCommandValueKeys {
    PK: string;
    SK: string;
}

export class UpdateCommandValue implements ICommandValue {
    public readonly command = "put";
    public readonly keys: IUpdateCommandValueKeys;

    public constructor(input: UpdateCommand) {
        this.keys = {
            PK: input.input.Key!.PK,
            SK: input.input.Key!.SK
        };
    }

    public toString(): string {
        return JSON.stringify({
            command: this.command,
            keys: this.keys
        });
    }
}
