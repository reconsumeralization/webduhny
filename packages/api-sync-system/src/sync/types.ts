import type { BatchWriteCommand, DeleteCommand, PutCommand } from "@webiny/aws-sdk/client-dynamodb";

export type IDynamoDbCommand = PutCommand | DeleteCommand | BatchWriteCommand;

export interface ICommandValue {
    toString(): string | null;
}

export interface ICommand<Result extends ICommandValue = ICommandValue> {
    name: string;
    can(input: IDynamoDbCommand): boolean;
    convert(input: IDynamoDbCommand): Result;
}

export interface ISystem {
    name: string;
    env: string;
    variant: string | undefined;
    region: string;
}

export interface IHandler {
    system: ISystem;
    flush(): Promise<void>;
    add(input: IDynamoDbCommand): void;
}

export interface ICommandConverter<Result extends ICommandValue = ICommandValue> {
    name: string;
    can(input: IDynamoDbCommand): boolean;
    convert(input: IDynamoDbCommand): Result;
}

export interface IHandlerConverter {
    register(input: ICommandConverter | ICommandConverter[]): void;
    convert(input: IDynamoDbCommand): ICommandValue;
}
