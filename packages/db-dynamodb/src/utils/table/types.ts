import type { TableDef } from "dynamodb-toolbox/dist/cjs/classes/Table/types";
import type { ITableReadBatch, ITableWriteBatch } from "../batch/types";

export interface ITable {
    table: TableDef;
    createWriter(): ITableWriteBatch;
    createReader(): ITableReadBatch;
}
