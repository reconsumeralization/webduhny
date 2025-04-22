import type { IRecordsDataSystem } from "../data/RecordsDataSystem";
import type {
    IRecordsDataSystemTable,
    IRecordsDataSystemTableBundle
} from "../data/RecordsDataSystemTable";
import type { GenericRecord } from "@webiny/api/types";

export interface IStorerExecParams<T = GenericRecord> {
    system: IRecordsDataSystem;
    table: IRecordsDataSystemTable;
    bundle: IRecordsDataSystemTableBundle;
    items: T[];
}

export interface IStorer {
    exec(params: IStorerExecParams): Promise<void>;
}
