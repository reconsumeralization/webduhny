import type { ITable } from "~/sync/types";
import type { IDeployment } from "~/resolver/deployment/types.js";
import type { PluginsContainer } from "@webiny/plugins/types";
import { TransformRecordPlugin } from "~/resolver/plugins/TransformRecordPlugin.js";
import { middleware, type MiddlewareCallable } from "@webiny/utils";
import { IStoreItem } from "../storer/types";
import type { GenericRecord } from "@webiny/api/types.js";

export interface IMiddlewareParams<O = GenericRecord> {
    record: IStoreItem;
    sourceDeployment: IDeployment;
    targetDeployment: IDeployment;
    sourceTable: ITable;
    targetTable: ITable;
    next: () => Promise<O>;
}

export interface ITransformHandlerTransformParams {
    sourceTable: ITable;
    sourceDeployment: IDeployment;
    targetTable: ITable;
    targetDeployment: IDeployment;
    items: IStoreItem[];
}

export interface ITransformHandlerTransformResult {
    items: IStoreItem[];
}

export interface ITransformHandler {
    transform(params: ITransformHandlerTransformParams): Promise<ITransformHandlerTransformResult>;
}

export interface ITransformHandlerParams {
    plugins: PluginsContainer;
}

export class TransformHandler implements ITransformHandler {
    private readonly plugins: TransformRecordPlugin[];

    public constructor(params: ITransformHandlerParams) {
        this.plugins = params.plugins.byType<TransformRecordPlugin>(TransformRecordPlugin.type);
    }

    public async transform(
        params: ITransformHandlerTransformParams
    ): Promise<ITransformHandlerTransformResult> {
        const { sourceTable, sourceDeployment, targetDeployment, targetTable, items } = params;

        const plugins = this.plugins.filter(plugin => {
            return plugin.canTransform({
                from: sourceDeployment,
                to: targetDeployment
            });
        });

        const runner = middleware(
            plugins.map(plugin => {
                return async (params: IMiddlewareParams, next: MiddlewareCallable) => {
                    return plugin.transform({
                        ...params,
                        next
                    });
                };
            })
        );

        const results = await Promise.all(
            items.map(async record => {
                return runner({
                    sourceTable,
                    sourceDeployment,
                    targetDeployment,
                    targetTable,
                    record
                });
            })
        );
        return {
            items: results.filter((item): item is IStoreItem => !!item)
        };
    }
}
