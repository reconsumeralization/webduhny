import type { TableDef } from "dynamodb-toolbox/dist/cjs/classes/Table/types";
import type { ITableReadBatch, ITableWriteBatch } from "../batch/types";
import { BaseScanParams, ScanResponse } from "../scan";

export type ITableScanParams = BaseScanParams;

export type ITableScanResponse<T> = ScanResponse<T>;

export interface ITable {
    table: TableDef;
    createWriter(): ITableWriteBatch;
    createReader(): ITableReadBatch;
    scan<T>(params: ITableScanParams): Promise<ITableScanResponse<T>>;
}
