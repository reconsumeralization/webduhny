import { Context as BaseContext } from "@webiny/handler-aws/types";

export type CommandType = "put" | "delete";
export type ExtendedCommandType = "put" | "delete" | "update";
export type AllCommandType = ExtendedCommandType | "batchWrite";

export interface Context extends BaseContext {}
