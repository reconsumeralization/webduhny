import type { ICommandValue } from "~/sync/types.js";

export class NullCommandValue implements ICommandValue {
    public toString(): string {
        return "";
    }
}
