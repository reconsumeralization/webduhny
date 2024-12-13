import type { WriteRequest } from "@webiny/aws-sdk/client-dynamodb";
import { Entity, TableDef } from "~/toolbox";

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
    TYPE: string;
} & T;

export interface BatchWriteItem {
    [key: string]: WriteRequest;
}

export interface IEntityWriteBatchBuilder {
    readonly entity: Entity;
    put<T extends Record<string, any>>(item: IPutBatchItem<T>): BatchWriteItem;
    delete(item: IDeleteBatchItem): BatchWriteItem;
}

export interface IEntityWriteBatch {
    readonly entity: Entity;
    readonly items: BatchWriteItem[];
    readonly builder: IEntityWriteBatchBuilder;

    put(item: IPutBatchItem): void;
    delete(item: IDeleteBatchItem): void;
    execute(): Promise<BatchWriteResult>;
    combine(items: BatchWriteItem[]): ITableWriteBatch;
}

export interface ITableWriteBatch {
    readonly table: TableDef;
    readonly items: BatchWriteItem[];
    put(entity: Entity, item: IPutBatchItem): void;
    delete(entity: Entity, item: IDeleteBatchItem): void;
    execute(): Promise<BatchWriteResult>;
    combine(items: BatchWriteItem[]): ITableWriteBatch;
}
