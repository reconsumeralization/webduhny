import { ICommand, type ICommandValue } from "~/sync/types";

export class NullCommand implements ICommand {
    public readonly name: string = "null";

    public can(): boolean {
        return false;
    }

    public convert(): ICommandValue {
        return {
            toString: () => null
        };
    }
}

export const createNullCommand = (): ICommand => {
    return new NullCommand();
};
