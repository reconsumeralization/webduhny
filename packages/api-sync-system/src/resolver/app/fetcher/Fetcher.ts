import type { GenericRecord } from "@webiny/api/types";
import type { IFetcher, IFetcherExecParams, IFetcherExecResult } from "./types";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { createFetchExecute } from "./FetchExecute.js";
import type { IDeployment } from "~/resolver/deployment/types.js";

export interface IFetcherParamsCreateDocumentClientCallable {
    (deployment: Pick<IDeployment, "region">): Pick<DynamoDBDocument, "send">;
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
        const { deployment, table, bundle } = params;

        const client = this.createDocumentClient(deployment.deployment);

        const cmd = createFetchExecute({
            maxBatchSize: params.maxBatchSize,
            maxRetries: params.maxRetries,
            retryDelay: params.retryDelay
        });

        const items = await cmd.execute<T>({
            client,
            deployment: deployment.deployment,
            table,
            bundle
        });

        return {
            items
        };
    }
}

export const createFetcher = (params: IFetcherParams): IFetcher => {
    return new Fetcher(params);
};
