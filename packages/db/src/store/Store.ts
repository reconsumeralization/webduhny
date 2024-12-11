import {
    IStore,
    StorageKey,
    StoreValueResult,
    StoreValuesResult,
    GetValuesResult,
    GetValueResult,
    ListValuesResult
} from "./types";
import { GenericRecord } from "@webiny/api/types";
import { DbDriver } from "~/index";

export interface IStoreParams<T> {
    driver: DbDriver<T>;
}

export class Store<T> implements IStore {
    private driver: DbDriver<T>;

    public constructor(params: IStoreParams<T>) {
        this.driver = params.driver;
    }

    public storeValue<V>(key: StorageKey, value: V): Promise<StoreValueResult<V>> {
        return this.driver.storeValue<V>(key, value);
    }

    public storeValues<V extends GenericRecord<StorageKey>>(
        values: V
    ): Promise<StoreValuesResult<V>> {
        return this.driver.storeValues<V>(values);
    }

    public getValue<V>(key: StorageKey): Promise<GetValueResult<V>> {
        return this.driver.getValue<V>(key);
    }

    public async getValues<V extends GenericRecord<StorageKey>>(
        keys: (keyof V)[]
    ): Promise<GetValuesResult<V>> {
        return this.driver.getValues<V>(keys);
    }

    public listValues<V extends GenericRecord<StorageKey>>(): Promise<ListValuesResult<V>> {
        return this.driver.listValues<V>();
    }
}
