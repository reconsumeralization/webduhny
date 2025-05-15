import type { IFetcher, IFetcherExecParams, IFetcherExecResult } from "./types";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { createFetchExecute } from "./FetchExecute.js";
import type { IDeployment } from "~/resolver/deployment/types.js";
import { SourceDataContainer } from "~/resolver/app/data/SourceDataContainer.js";

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

    public async exec(params: IFetcherExecParams): Promise<IFetcherExecResult> {
        const { deployment, items: input, maxRetries, retryDelay, table, maxBatchSize } = params;
        if (input.length === 0) {
            return {
                items: SourceDataContainer.create()
            };
        }

        const client = this.createDocumentClient(deployment);

        const cmd = createFetchExecute({
            maxBatchSize,
            maxRetries,
            retryDelay
        });

        const results = await cmd.execute({
            client,
            table,
            records: input
        });

        const items = SourceDataContainer.create();

        for (const item of input) {
            const data = results.find(result => {
                return item.PK === result.PK && item.SK === result.SK;
            });
            items.add(
                {
                    PK: item.PK,
                    SK: item.SK,
                    table,
                    source: deployment
                },
                data || null
            );
        }

        return {
            items
        };
    }
}

export const createFetcher = (params: IFetcherParams): IFetcher => {
    return new Fetcher(params);
};
