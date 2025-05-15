import type { IDeployment } from "~/resolver/deployment/types.js";
import type { ITable } from "~/sync/types.js";
import type { IBundle } from "~/resolver/app/bundler/types.js";

export interface IStoreItem {
    PK: string;
    SK: string;
    [key: string]: unknown;
}

export interface IStorerExecParams {
    deployment: IDeployment;
    bundle: IBundle;
    table: ITable;
    items: IStoreItem[];
}

export interface IStorer {
    store(params: IStorerExecParams): Promise<void>;
}
