import { Context as BaseContext } from "@webiny/handler-aws/types";

export type CommandType = "put" | "delete" | "update";
export type AllCommandType = CommandType | "batchWrite";

export interface Context extends BaseContext {}
