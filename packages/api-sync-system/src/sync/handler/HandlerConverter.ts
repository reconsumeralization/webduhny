import type {
    ICommandConverter,
    ICommandValue,
    IDynamoDbCommand,
    IHandlerConverter
} from "../types.js";

export interface IHandlerConverterParams {
    default: ICommandValue;
}

export class HandlerConverter implements IHandlerConverter {
    private readonly _default: ICommandValue;
    private readonly converters: ICommandConverter[] = [];

    public constructor(params: IHandlerConverterParams) {
        this._default = params.default;
    }

    public register(input: ICommandConverter | ICommandConverter[]): void {
        if (!input) {
            return;
        } else if (Array.isArray(input)) {
            this.converters.push(...input);
            return;
        }

        this.converters.push(input);
    }

    public convert(command: IDynamoDbCommand): ICommandValue {
        for (const converter of this.converters) {
            if (converter.can(command)) {
                return converter.convert(command);
            }
        }
        /**
         * We ALWAYS log unknown commands as we do not know what user will do with the DynamoDB client.
         */
        console.error(`Unknown command: ${command.constructor?.name || "unknown"}`);
        console.log(
            JSON.stringify({
                command
            })
        );

        return this._default;
    }
}

export const createHandlerConverter = (params: IHandlerConverterParams): IHandlerConverter => {
    return new HandlerConverter(params);
};
