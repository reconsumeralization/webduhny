import type { ICommand, ICommandValue, IDynamoDbCommand, IHandlerConverter } from "../types.js";

export class HandlerConverter implements IHandlerConverter {
    private readonly def: ICommand;
    private readonly commands: ICommand[] = [];

    public constructor(def: ICommand) {
        this.def = def;
    }

    public register(command: ICommand) {
        this.commands.push(command);
    }

    public convert(input: IDynamoDbCommand): ICommandValue {
        for (const command of this.commands) {
            if (command.can(input)) {
                return command.convert(input);
            }
        }
        return this.def;
    }
}

export const createHandlerConverter = (def: ICommand): IHandlerConverter => {
    return new HandlerConverter(def);
};
