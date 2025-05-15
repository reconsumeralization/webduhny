import type { IStorer, IStorerExecParams } from "./types";
import { BatchWriteCommand, type DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";
import type { IDeployment } from "~/resolver/deployment/types.js";
import { convertException } from "@webiny/utils/exception.js";
import lodashChunk from "lodash/chunk";

export interface IStorerParamsCreateDocumentClientCallable {
    (deployment: Pick<IDeployment, "region">): Pick<DynamoDBDocument, "send">;
}

export interface IStorerParams {
    maxBatchSize?: number;
    maxRetries?: number;
    retryDelay?: number;
    createDocumentClient: IStorerParamsCreateDocumentClientCallable;
}

export class Storer implements IStorer {
    private readonly maxBatchSize: number;
    private readonly maxRetries: number;
    private readonly retryDelay: number;
    private retryCount = 0;
    private readonly createDocumentClient: IStorerParamsCreateDocumentClientCallable;

    public constructor(params: IStorerParams) {
        this.maxBatchSize = params.maxBatchSize || 25;
        this.maxRetries = params.maxRetries || 10;
        this.retryDelay = params.retryDelay || 1000;
        this.createDocumentClient = params.createDocumentClient;
    }

    public async store(params: IStorerExecParams): Promise<void> {
        const { deployment, table, bundle, items } = params;
        const client = this.createDocumentClient({
            region: deployment.region
        });

        const batches = lodashChunk(items, this.maxBatchSize);

        const requestType = bundle.command === "delete" ? "DeleteRequest" : "PutRequest";
        const requestTypeKey = bundle.command === "delete" ? "Key" : "Item";

        for (const batch of batches) {
            let cmd: BatchWriteCommand | undefined = undefined;
            this.resetRetries();
            do {
                cmd = new BatchWriteCommand({
                    RequestItems: {
                        [table.name]: batch.map(item => {
                            return {
                                [requestType]: {
                                    [requestTypeKey]: item
                                }
                            };
                        })
                    }
                });
                try {
                    const result = await client.send(cmd);

                    if (!result.UnprocessedItems?.[table.name]) {
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

export const createStorer = (params: IStorerParams): IStorer => {
    return new Storer(params);
};
