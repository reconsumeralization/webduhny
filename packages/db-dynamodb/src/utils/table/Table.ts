import type { TableConstructor } from "~/toolbox";
import { Table as BaseTable } from "~/toolbox";
import type { ITable } from "./types";
import type { ITableReadBatch, ITableWriteBatch } from "../batch/types";
import { createTableWriteBatch } from "../batch/TableWriteBatch";
import { createTableReadBatch } from "../batch/TableReadBatch";

export class Table<
    Name extends string = string,
    PartitionKey extends string = string,
    SortKey extends string = string
> implements ITable
{
    public readonly table: BaseTable<Name, PartitionKey, SortKey>;

    public constructor(params: TableConstructor<Name, PartitionKey, SortKey>) {
        this.table = new BaseTable(params);
    }

    public createWriter(): ITableWriteBatch {
        return createTableWriteBatch({
            table: this.table
        });
    }

    public createReader(): ITableReadBatch {
        return createTableReadBatch({
            table: this.table
        });
    }
}
