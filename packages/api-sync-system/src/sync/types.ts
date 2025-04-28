import { NonEmptyArray } from "@webiny/api/types";
import {
    type GetCommand,
    type BatchGetCommand,
    type BatchWriteCommand,
    type DeleteCommand,
    type PutCommand,
    type UpdateCommand
} from "@webiny/aws-sdk/client-dynamodb";
import type { AllCommandType, ExtendedCommandType } from "~/types.js";

export interface IManifestData {
    region: string;
    eventBusName: string;
    eventBusArn: string;
}

export interface IManifest {
    sync: IManifestData;
}

export type IDynamoDbCommand =
    | PutCommand
    | DeleteCommand
    | BatchWriteCommand
    | BatchGetCommand
    | GetCommand
    | UpdateCommand;

export interface ICommandValueItem {
    PK: string;
    SK: string;
    command: ExtendedCommandType;
    tableName: string;
}

export interface ICommandValue {
    readonly command: AllCommandType;
    getItems(): NonEmptyArray<ICommandValueItem> | null;
}

export interface ICommand<Result extends ICommandValue = ICommandValue> {
    name: string;
    can(input: IDynamoDbCommand): boolean;
    convert(input: IDynamoDbCommand): Result;
}

export interface ISystem {
    name: string;
    env: string;
    variant?: string | undefined;
    region: string;
    version: string;
}

export interface IHandler {
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
