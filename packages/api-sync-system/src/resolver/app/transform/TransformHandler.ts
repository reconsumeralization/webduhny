import type { ITable } from "~/sync/types";
import type { IDeployment } from "~/resolver/deployment/types.js";
import type { PluginsContainer } from "@webiny/plugins/types";
import { TransformRecordPlugin } from "~/resolver/plugins/TransformRecordPlugin.js";
import { middleware } from "./middleware.js";
import { IStoreItem } from "../storer/types";

export interface IMiddlewareParams {
    readonly record: IStoreItem;
    sourceDeployment: IDeployment;
    targetDeployment: IDeployment;
    sourceTable: ITable;
    targetTable: ITable;
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

        const runner = middleware<IMiddlewareParams, IStoreItem>(
            plugins.map(plugin => {
                return async (params, next) => {
                    return await plugin.transform(params, next);
                };
            })
        );

        const results = await Promise.all(
            items.map(async input => {
                const record = Object.freeze(input);
                return await runner(
                    {
                        sourceTable,
                        sourceDeployment,
                        targetDeployment,
                        targetTable,
                        record
                    },
                    record
                );
            })
        );
        return {
            items: results.filter((item): item is IStoreItem => !!item)
        };
    }
}
