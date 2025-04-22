import { Plugin } from "@webiny/plugins";
import type { GenericRecord } from "@webiny/api/types.js";
import type { IRecordsDataSystem } from "~/resolver/app/data/RecordsDataSystem.js";
import { IRecordsDataSystemTable } from "../app/data/RecordsDataSystemTable";

export interface ITransformRecordPluginConfigTransformCallableParams<
    I = unknown,
    O = GenericRecord
> {
    record: GenericRecord<string, I>;
    system: IRecordsDataSystem;
    table: IRecordsDataSystemTable;
    next: () => Promise<O>;
}

export interface ITransformRecordPluginConfigTransformCallable<I = unknown, O = GenericRecord> {
    (params: ITransformRecordPluginConfigTransformCallableParams<I, O>): Promise<O>;
}

export interface ITransformRecordPluginConfig<I = unknown, O = GenericRecord> {
    transform: ITransformRecordPluginConfigTransformCallable<I, O>;
}

export class TransformRecordPlugin<I = unknown, O = GenericRecord> extends Plugin {
    public static override type: string = "syncSystem.transformRecordPlugin";

    private readonly config: ITransformRecordPluginConfig<I, O>;

    public constructor(config: ITransformRecordPluginConfig<I, O>) {
        super();
        this.config = config;
    }

    public transform(params: ITransformRecordPluginConfigTransformCallableParams<I>): Promise<O> {
        return this.config.transform(params);
    }
}

export const createTransformRecordPlugin = <I = unknown, O = GenericRecord>(
    transform: ITransformRecordPluginConfigTransformCallable<I, O>
) => {
    return new TransformRecordPlugin<I, O>({
        transform
    });
};
