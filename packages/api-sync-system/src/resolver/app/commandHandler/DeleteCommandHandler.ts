import type { IRecordsDataDeployment } from "~/resolver/app/data/RecordsDataDeployment.js";
import type {
    IRecordsDataDeploymentTable,
    IRecordsDataDeploymentTableBundle
} from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import type { IFetcher } from "../fetcher/types";
import type { IStorer } from "../storer/types";

export interface IDeleteCommandHandlerHandleParams {
    deployment: IRecordsDataDeployment;
    table: IRecordsDataDeploymentTable;
    bundle: IRecordsDataDeploymentTableBundle;
}

export interface IDeleteCommandHandlerParams {
    fetcher: IFetcher;
    storer: IStorer;
}

export class DeleteCommandHandler {
    private readonly fetcher: IFetcher;
    private readonly storer: IStorer;

    public constructor(params: IDeleteCommandHandlerParams) {
        this.fetcher = params.fetcher;
        this.storer = params.storer;
    }
    public async handle(config: IDeleteCommandHandlerHandleParams): Promise<void> {
        const { deployment, table, bundle } = config;

        const { items } = await this.fetcher.exec({ deployment, table, bundle });

        const result = items.map(item => {
            return {
                PK: item.PK,
                SK: item.SK
            };
        });

        await this.storer.exec({
            deployment,
            table,
            bundle,
            items: result
        });
    }
}
