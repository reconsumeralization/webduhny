import type { GenericRecord } from "@webiny/api/types";
import { BatchGetCommand, type DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import lodashChunk from "lodash/chunk";
import { convertException } from "@webiny/utils";
import {
    IFetchExecute,
    type IFetchExecuteExecuteParams,
    type IFetchExecuteExecuteParamsItem
} from "./types";

export interface IFetchExecuteParams {
    maxBatchSize?: number;
    maxRetries?: number;
    retryDelay?: number;
}

interface IFetcherExecuteRunCommandResult<T = GenericRecord> {
    items: T[];
    unprocessedKeys: IKeys[];
}

interface IKeys {
    PK: string;
    SK: string;
}

interface IFetcherExecuteRunCommandParams {
    command: BatchGetCommand;
    table: string;
    client: Pick<DynamoDBDocument, "send">;
}

export class FetchExecute implements IFetchExecute {
    private readonly maxBatchSize: number;
    private readonly maxRetries: number;
    private readonly retryDelay: number;
    private retryCount = 0;

    public constructor(params: IFetchExecuteParams) {
        this.maxBatchSize = params.maxBatchSize || 100;
        this.maxRetries = params.maxRetries || 10;
        this.retryDelay = params.retryDelay || 1000;
    }

    public async execute<T = GenericRecord>(params: IFetchExecuteExecuteParams) {
        const { client, table, records: items } = params;
        const batches = lodashChunk(items, this.maxBatchSize);

        const results: T[] = [];
        for (const batch of batches) {
            let keys = this.getKeys(batch);

            while (keys.length > 0) {
                const command = new BatchGetCommand({
                    RequestItems: {
                        [table.name]: {
                            Keys: keys
                        }
                    }
                });
                this.retryCount = 0;
                const { items, unprocessedKeys } = await this.runCommand<T>({
                    command,
                    client,
                    table: table.name
                });

                results.push(...items);

                keys = unprocessedKeys;
            }
        }
        return results;
    }

    private async runCommand<T = GenericRecord>(
        params: IFetcherExecuteRunCommandParams
    ): Promise<IFetcherExecuteRunCommandResult<T>> {
        const { command, table, client } = params;

        try {
            const result = await client.send(command);

            return {
                items: (result.Responses?.[table] || []) as T[],
                unprocessedKeys: (result.UnprocessedKeys?.[table]?.Keys || []) as IKeys[]
            };
        } catch (ex) {
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                await this.sleep();
                return await this.runCommand<T>(params);
            }
            console.error(`Max retries reached. Could not fetch items from table: ${table}`);
            console.log(convertException(ex));
            throw ex;
        }
    }

    private async sleep() {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                resolve();
            }, this.retryDelay);
        });
    }

    private getKeys(items: IFetchExecuteExecuteParamsItem[]): IKeys[] {
        return items.map(item => {
            return {
                PK: item.PK,
                SK: item.SK
            };
        });
    }
}

export const createFetchExecute = (params: IFetchExecuteParams): IFetchExecute => {
    return new FetchExecute(params);
};
