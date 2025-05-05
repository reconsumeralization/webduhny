import { Context as BaseContext } from "@webiny/handler-aws/types";

export type CommandType = "put" | "delete";
export type ExtendedCommandType = "put" | "delete" | "update";
export type AllCommandType = ExtendedCommandType | "batchWrite";

export type DynamoDBTableType = "regular" | "elasticsearch" | "log" | "unknown";

export interface Context extends BaseContext {}
