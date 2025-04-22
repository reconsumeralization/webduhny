import type { IRecordsDataSystem } from "~/resolver/app/data/RecordsDataSystem.js";
import { TransformRecordPlugin } from "~/resolver/plugins/TransformRecordPlugin";
import { middleware, type MiddlewareCallable } from "@webiny/utils";
import type { GenericRecord } from "@webiny/api/types.js";
import type {
    IRecordsDataSystemTable,
    IRecordsDataSystemTableBundle
} from "~/resolver/app/data/RecordsDataSystemTable.js";
import { IFetcher } from "../fetcher/types";
import { IStorer } from "../storer/types";

export interface IPutCommandHandlerHandleParams {
    system: IRecordsDataSystem;
    table: IRecordsDataSystemTable;
    bundle: IRecordsDataSystemTableBundle;
}

export interface IPutCommandHandlerParams {
    plugins: TransformRecordPlugin[];
    fetcher: IFetcher;
    storer: IStorer;
}

export interface IMiddlewareParams<I = unknown, O = GenericRecord> {
    record: GenericRecord<string, I>;
    system: IRecordsDataSystem;
    table: IRecordsDataSystemTable;
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
        const { system, table, bundle } = config;

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

        const { items } = await this.fetcher.exec({ system, table, bundle });

        const result = await Promise.all(
            items.map(async record => {
                return runner({
                    system,
                    table,
                    bundle,
                    record
                });
            })
        );

        await this.storer.exec({
            system,
            table,
            bundle,
            items: result
        });
    }
}
