import { Plugin } from "@webiny/plugins";
import type { ITable } from "~/sync/types.js";
import type { IDeployment } from "~/resolver/deployment/types.js";
import type { IStoreItem } from "~/resolver/app/storer/types.js";

export interface ITransformRecordPluginConfigTransformCallableParams {
    record: IStoreItem;
    sourceDeployment: IDeployment;
    targetDeployment: IDeployment;
    sourceTable: ITable;
    targetTable: ITable;
    next: () => Promise<IStoreItem>;
}

export interface ITransformRecordPluginConfigCanTransformCallableParams {
    from: Omit<IDeployment, "getTable">;
    to: Omit<IDeployment, "getTable">;
}

export interface ITransformRecordPluginConfigCanTransformCallable {
    (params: ITransformRecordPluginConfigCanTransformCallableParams): boolean;
}

export interface ITransformRecordPluginConfigTransformCallable {
    (params: ITransformRecordPluginConfigTransformCallableParams): Promise<IStoreItem>;
}

export interface ITransformRecordPluginConfig {
    canTransform: ITransformRecordPluginConfigCanTransformCallable;
    transform: ITransformRecordPluginConfigTransformCallable;
}

export class TransformRecordPlugin extends Plugin {
    public static override type: string = "syncSystem.transformRecordPlugin";

    private readonly config: ITransformRecordPluginConfig;

    public constructor(config: ITransformRecordPluginConfig) {
        super();
        this.config = config;
    }

    public canTransform(params: ITransformRecordPluginConfigCanTransformCallableParams): boolean {
        return this.config.canTransform(params);
    }

    public transform(
        params: ITransformRecordPluginConfigTransformCallableParams
    ): Promise<IStoreItem> {
        return this.config.transform(params);
    }
}

export const createTransformRecordPlugin = (config: ITransformRecordPluginConfig) => {
    return new TransformRecordPlugin(config);
};
