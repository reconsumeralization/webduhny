import { GenericRecord } from "@webiny/api/types";
import { BatchWriteCommand } from "@webiny/aws-sdk/client-dynamodb";
import type { IStoreExecute, IStoreExecuteExecuteParams } from "~/resolver/app/storer/types.js";
import lodashChunk from "lodash/chunk";
import { convertException } from "@webiny/utils/exception.js";

export interface IStoreExecuteParams {
    maxBatchSize?: number;
    maxRetries?: number;
    retryDelay?: number;
}

export class StoreExecute implements IStoreExecute {
    private readonly maxBatchSize: number;
    private readonly maxRetries: number;
    private readonly retryDelay: number;
    private retryCount = 0;

    public constructor(params: IStoreExecuteParams) {
        this.maxBatchSize = params.maxBatchSize || 25;
        this.maxRetries = params.maxRetries || 10;
        this.retryDelay = params.retryDelay || 1000;
    }
    public async execute<T = GenericRecord>(params: IStoreExecuteExecuteParams<T>): Promise<void> {
        const { items, table, bundle, client } = params;

        const batches = lodashChunk(items, this.maxBatchSize);

        const requestType = bundle.command === "delete" ? "DeleteRequest" : "PutRequest";
        const requestTypeKey = bundle.command === "delete" ? "Key" : "Item";

        for (const batch of batches) {
            let cmd: BatchWriteCommand | undefined = undefined;
            this.resetRetries();
            do {
                cmd = new BatchWriteCommand({
                    RequestItems: {
                        [table]: batch.map(item => {
                            return {
                                [requestType]: {
                                    [requestTypeKey]: item as Record<string, unknown>
                                }
                            };
                        })
                    }
                });
                try {
                    const result = await client.send(cmd);

                    if (!result.UnprocessedItems?.[table]) {
                        cmd = undefined;
                        this.resetRetries();
                        continue;
                    }
                    cmd = new BatchWriteCommand({
                        RequestItems: result.UnprocessedItems
                    });
                } catch (ex) {
                    if (this.retryCount < this.maxRetries) {
                        await this.waitRetry();
                        continue;
                    }
                    console.error("Error executing batch write command.");
                    console.log(convertException(ex));
                    throw new Error("Batch write command failed");
                }
            } while (cmd);
        }
    }

    private async sleep(): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this.retryDelay);
        });
    }

    private async waitRetry(): Promise<void> {
        this.retryCount++;
        return await this.sleep();
    }

    private resetRetries(): void {
        this.retryCount = 0;
    }
}

export const createStoreExecute = (params: IStoreExecuteParams): IStoreExecute => {
    return new StoreExecute(params);
};
