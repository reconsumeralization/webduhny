import type { GenericRecord } from "@webiny/api/types";
import type { IFetcher, IFetcherExecParams, IFetcherExecResult } from "./types";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { createFetchExecute } from "./FetchExecute.js";
import type { ISystem } from "~/sync/types";

export interface IFetcherParamsCreateDocumentClientCallable {
    (system: ISystem): Pick<DynamoDBDocument, "send">;
}

export interface IFetcherParams {
    createDocumentClient: IFetcherParamsCreateDocumentClientCallable;
}

export class Fetcher implements IFetcher {
    private readonly createDocumentClient: IFetcherParamsCreateDocumentClientCallable;

    public constructor(params: IFetcherParams) {
        this.createDocumentClient = params.createDocumentClient;
    }

    public async exec<T = GenericRecord>(
        params: IFetcherExecParams
    ): Promise<IFetcherExecResult<T>> {
        const { system, table, bundle } = params;

        const client = this.createDocumentClient(system.system);

        const cmd = createFetchExecute({
            client,
            system: system.system,
            table,
            bundle,
            maxBatchSize: params.maxBatchSize,
            maxRetries: params.maxRetries,
            retryDelay: params.retryDelay
        });

        const items = await cmd.execute<T>();

        return {
            items
        };
    }
}

export const createFetcher = (params: IFetcherParams): IFetcher => {
    return new Fetcher(params);
};
