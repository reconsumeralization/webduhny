import type { IStoreItem, IStorer } from "../storer/types";
import type { ITable } from "~/sync/types";
import type { IDeployment } from "~/resolver/deployment/types.js";
import type { IBundle } from "~/resolver/app/bundler/types.js";

export interface IPutCommandHandlerHandleParams {
    items: IStoreItem[];
    sourceDeployment: IDeployment;
    sourceTable: ITable;
    targetDeployment: IDeployment;
    targetTable: ITable;
    bundle: IBundle;
}

export interface IPutCommandHandlerParams {
    storer: IStorer;
}

export class PutCommandHandler {
    private readonly storer: IStorer;

    public constructor(params: IPutCommandHandlerParams) {
        this.storer = params.storer;
    }
    public async handle(params: IPutCommandHandlerHandleParams): Promise<void> {
        const { items, targetDeployment, targetTable, bundle } = params;

        await this.storer.store({
            deployment: targetDeployment,
            table: targetTable,
            items,
            bundle
        });
    }
}
