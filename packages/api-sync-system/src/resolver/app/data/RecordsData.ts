import { ISystem } from "~/sync/types";
import { IRecordsDataSystem } from "./RecordsDataSystem";
import type { IResolverSQSRecord } from "~/resolver/app/abstractions/ResolverRecord.js";

export interface IRecordsDataSystemCreateRecordsDataSystemCallable {
    (system: ISystem): IRecordsDataSystem;
}

export interface IRecordsDataParams {
    createRecordsDataSystem: IRecordsDataSystemCreateRecordsDataSystemCallable;
}

export interface IRecordsDataIngestParams {
    records: IResolverSQSRecord[];
}

export interface IRecordsData {
    getSystems(): IRecordsDataSystem[];
    ingest(params: IRecordsDataIngestParams): Promise<void>;
}

export class RecordsData implements IRecordsData {
    private readonly data: IRecordsDataSystem[] = [];

    private readonly createRecordsDataSystem: IRecordsDataSystemCreateRecordsDataSystemCallable;

    public constructor(params: IRecordsDataParams) {
        this.createRecordsDataSystem = params.createRecordsDataSystem;
    }

    public async ingest(params: IRecordsDataIngestParams): Promise<void> {
        const { records } = params;

        for (const record of records) {
            const system = this.getSystem(record.body.detail.source);

            await system.ingest({
                items: record.body.detail.items
            });
        }
    }

    public getSystems(): IRecordsDataSystem[] {
        return this.data;
    }

    private getSystem(system: ISystem): IRecordsDataSystem {
        const existingSystem = this.data.find(item => item.system.name === system.name);
        if (existingSystem) {
            return existingSystem;
        }

        const newSystem = this.createRecordsDataSystem(system);
        this.data.push(newSystem);
        return newSystem;
    }
}

export const createRecordsData = (params: IRecordsDataParams): IRecordsData => {
    return new RecordsData(params);
};
