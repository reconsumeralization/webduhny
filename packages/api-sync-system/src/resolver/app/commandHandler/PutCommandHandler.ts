import type { IRecordsDataDeployment } from "~/resolver/app/data/RecordsDataDeployment.js";
import type { TransformRecordPlugin } from "~/resolver/plugins/TransformRecordPlugin";
import { middleware, type MiddlewareCallable } from "@webiny/utils";
import type { GenericRecord } from "@webiny/api/types.js";
import type {
    IRecordsDataDeploymentTable,
    IRecordsDataDeploymentTableBundle
} from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import type { IFetcher } from "../fetcher/types";
import type { IStorer } from "../storer/types";

export interface IPutCommandHandlerHandleParams {
    deployment: IRecordsDataDeployment;
    table: IRecordsDataDeploymentTable;
    bundle: IRecordsDataDeploymentTableBundle;
}

export interface IPutCommandHandlerParams {
    plugins: TransformRecordPlugin[];
    fetcher: IFetcher;
    storer: IStorer;
}

export interface IMiddlewareParams<I = unknown, O = GenericRecord> {
    record: GenericRecord<string, I>;
    deployment: IRecordsDataDeployment;
    table: IRecordsDataDeploymentTable;
    next: () => Promise<O>;
}

export class PutCommandHandler {
    private readonly plugins: TransformRecordPlugin[];
    private readonly fetcher: IFetcher;
    private readonly storer: IStorer;

    public constructor(params: IPutCommandHandlerParams) {
        this.plugins = params.plugins;
        this.fetcher = params.fetcher;
        this.storer = params.storer;
    }
    public async handle(config: IPutCommandHandlerHandleParams): Promise<void> {
        const { deployment, table, bundle } = config;

        const runner = middleware(
            this.plugins.map(plugin => {
                return async (params: IMiddlewareParams, next: MiddlewareCallable) => {
                    return plugin.transform({
                        ...params,
                        next
                    });
                };
            })
        );

        const { items } = await this.fetcher.exec({ deployment, table, bundle });

        const result = await Promise.all(
            items.map(async record => {
                return runner({
                    deployment,
                    table,
                    bundle,
                    record
                });
            })
        );

        await this.storer.exec({
            deployment,
            table,
            bundle,
            items: result
        });
    }
}
