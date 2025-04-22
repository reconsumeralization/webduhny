import type { GenericRecord } from "@webiny/api/types";
import { BatchGetCommand, type getDocumentClient } from "@webiny/aws-sdk/client-dynamodb";
import type {
    IRecordsDataSystemTable,
    IRecordsDataSystemTableBundle
} from "~/resolver/app/data/RecordsDataSystemTable.js";
import type { ISystem } from "~/sync/types.js";
import lodashChunk from "lodash/chunk";
import type { IRecordsDataSystemTableItem } from "~/resolver/app/data/RecordsDataSystemTableItem.js";
import { convertException } from "@webiny/utils";
import { IFetchExecute } from "./types";

export interface IFetchExecuteParams {
    client: Pick<ReturnType<typeof getDocumentClient>, "send">;
    system: ISystem;
    table: IRecordsDataSystemTable;
    bundle: IRecordsDataSystemTableBundle;
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
}

export class FetchExecute implements IFetchExecute {
    private readonly client: Pick<ReturnType<typeof getDocumentClient>, "send">;
    private readonly system: ISystem;
    private readonly table: IRecordsDataSystemTable;
    private readonly bundle: IRecordsDataSystemTableBundle;
    private readonly maxBatchSize: number = 100;
    private readonly maxRetries: number = 10;
    private readonly retryDelay: number = 1000;
    private retryCount = 0;

    public constructor(params: IFetchExecuteParams) {
        this.client = params.client;
        this.system = params.system;
        this.table = params.table;
        this.bundle = params.bundle;
        this.maxBatchSize = params.maxBatchSize || this.maxBatchSize;
        this.maxRetries = params.maxRetries || this.maxRetries;
        this.retryDelay = params.retryDelay || this.retryDelay;
    }

    public async execute<T = GenericRecord>() {
        const batches = lodashChunk(this.bundle.items, this.maxBatchSize);

        const results: T[] = [];
        for (const batch of batches) {
            let keys = this.getKeys(batch);

            while (keys.length > 0) {
                const command = new BatchGetCommand({
                    RequestItems: {
                        [this.table.name]: {
                            Keys: keys
                        }
                    }
                });
                this.retryCount = 0;
                const { items, unprocessedKeys } = await this.runCommand<T>({
                    command
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
        const { command } = params;

        try {
            const result = await this.client.send(command);

            return {
                items: (result.Responses?.[this.table.name] || []) as T[],
                unprocessedKeys: (result.UnprocessedKeys?.[this.table.name]?.Keys || []) as IKeys[]
            };
        } catch (ex) {
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                await this.sleep();
                return await this.runCommand<T>(params);
            }
            console.error(
                `Max retries reached. Could not fetch items from table: ${this.table.name}`
            );
            console.log(convertException(ex));
            throw ex;
        }
    }

    private async sleep() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, this.retryDelay);
        });
    }

    private getKeys(items: IRecordsDataSystemTableItem[]): IKeys[] {
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
