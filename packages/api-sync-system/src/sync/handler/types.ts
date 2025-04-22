import { NonEmptyArray } from "@webiny/api/types";
import { ISystem } from "../types";
import type { AllCommandType, ExtendedCommandType } from "~/types.js";

export interface IDetailItem {
    PK: string;
    SK: string;
    command: ExtendedCommandType;
    /**
     * Table name to which the record belongs.
     * There will be multiple tables that will get populated through the system (regular table and elasticsearch for start).
     */
    tableName: string;
}

export interface IDetail {
    items: NonEmptyArray<IDetailItem>;
    source: ISystem;
    command: AllCommandType;
}
