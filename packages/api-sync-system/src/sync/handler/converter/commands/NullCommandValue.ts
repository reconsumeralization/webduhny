import type { ICommandValue } from "~/sync/types.js";

export class NullCommandValue implements ICommandValue {
    /**
     * Does not matter what will be here, we will not use it.
     */
    public readonly command = "put";

    public getItems(): null {
        return null;
    }
}
