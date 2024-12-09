import type { GenericRecord } from "@webiny/app/types";
import { Checksum } from "./Checksum";

export type DataSourceData = GenericRecord<string>;

export interface IDataRequest {
    name: string;
    type: string;
    config: GenericRecord;
    paths?: string[];
}

export class DataRequest {
    private readonly request: IDataRequest;

    protected constructor(request: IDataRequest) {
        this.request = request;
    }

    static create(request: IDataRequest) {
        return new DataRequest(request);
    }

    getKey() {
        const paths = this.request.paths ?? [];
        return `${this.getName()}:${this.getType()}:${paths.join(";")}`;
    }

    getName() {
        return this.request.name;
    }

    getType() {
        return this.request.type;
    }

    getConfig() {
        return this.request.config;
    }

    getPaths() {
        return this.request.paths ?? [];
    }

    async getChecksum() {
        const checksum = await Checksum.createFrom(this.request.config);
        return checksum.getChecksum();
    }
}

export interface IResolveDataSourceRepository {
    getData(key: string): DataSourceData | undefined;
    resolveData(request: DataRequest): Promise<void>;
}
