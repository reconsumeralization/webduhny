import type { WriteRequest } from "@webiny/aws-sdk/client-dynamodb";
import type { Entity, TableDef } from "~/toolbox";
import type { GenericRecord } from "@webiny/api/types";
import type { batchReadAll } from "~/utils";

export interface BatchWriteResponse {
    next?: () => Promise<BatchWriteResponse>;
    $metadata: {
        httpStatusCode: number;
        requestId: string;
        attempts: number;
        totalRetryDelay: number;
    };
    UnprocessedItems?: {
        [table: string]: WriteRequest[];
    };
}

export type BatchWriteResult = BatchWriteResponse[];

export interface IDeleteBatchItem {
    PK: string;
    SK: string;
}

export type IPutBatchItem<T extends Record<string, any> = Record<string, any>> = {
    PK: string;
    SK: string;
} & T;

export interface BatchWriteItem {
    [key: string]: WriteRequest;
}

export interface IEntityWriteBatchBuilder {
    // readonly entity: Entity;
    put<T extends Record<string, any>>(item: IPutBatchItem<T>): BatchWriteItem;
    delete(item: IDeleteBatchItem): BatchWriteItem;
}

export interface IEntityWriteBatch {
    readonly total: number;
    // readonly entity: Entity;
    readonly items: BatchWriteItem[];
    // readonly builder: IEntityWriteBatchBuilder;

    put(item: IPutBatchItem): void;
    delete(item: IDeleteBatchItem): void;
    execute(): Promise<BatchWriteResult>;
    combine(items: BatchWriteItem[]): ITableWriteBatch;
}

export interface ITableWriteBatch {
    readonly total: number;
    // readonly table: TableDef;
    readonly items: BatchWriteItem[];
    put(entity: Entity, item: IPutBatchItem): void;
    delete(entity: Entity, item: IDeleteBatchItem): void;
    execute(): Promise<BatchWriteResult>;
    combine(items: BatchWriteItem[]): ITableWriteBatch;
}

export interface IEntityReadBatchKey {
    PK: string;
    SK: string;
}

export interface IEntityReadBatch {
    get(input: IEntityReadBatchKey | IEntityReadBatchKey[]): void;
    execute<T = GenericRecord>(): ReturnType<typeof batchReadAll<T>>;
}

export interface IEntityReadBatchBuilderGetResponse {
    Table: TableDef;
    Key: IEntityReadBatchKey;
}

export interface IEntityReadBatchBuilder {
    get(item: IEntityReadBatchKey): IEntityReadBatchBuilderGetResponse;
}

export interface ITableReadBatchKey {
    PK: string;
    SK: string;
}

export interface ITableReadBatch {
    readonly total: number;
    readonly items: IEntityReadBatchBuilderGetResponse[];
    get(entity: Entity, input: ITableReadBatchKey | ITableReadBatchKey[]): void;
    execute<T = GenericRecord>(): Promise<T[]>;
}
