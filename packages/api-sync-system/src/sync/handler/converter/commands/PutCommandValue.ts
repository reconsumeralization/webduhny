import { PutCommand } from "@webiny/aws-sdk/client-dynamodb";
import type { ICommandValue } from "~/sync/types.js";

export interface IPutCommandValueKeys {
    PK: string;
    SK: string;
}

export class PutCommandValue implements ICommandValue {
    public readonly command = "put";
    public readonly keys: IPutCommandValueKeys;

    public constructor(input: PutCommand) {
        this.keys = {
            PK: input.input.Item!.PK,
            SK: input.input.Item!.SK
        };
    }

    public toString(): string {
        return JSON.stringify({
            command: this.command,
            keys: this.keys
        });
    }
}
