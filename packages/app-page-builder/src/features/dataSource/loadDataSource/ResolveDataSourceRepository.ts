import { makeAutoObservable } from "mobx";
import {
    DataSourceData,
    DataRequest,
    IResolveDataSourceRepository
} from "./IResolveDataSourceRepository";
import { IResolveDataSourceGateway } from "~/features/dataSource/loadDataSource/IResolveDataSourceGateway";
import { DataSourceCache } from "~/features/dataSource/loadDataSource/dataSourceCache";
import { IListCache } from "~/features/ListCache";

export class ResolveDataSourceRepository implements IResolveDataSourceRepository {
    private gateway: IResolveDataSourceGateway;
    private cache: IListCache<DataSourceCache>;

    constructor(gateway: IResolveDataSourceGateway, cache: IListCache<DataSourceCache>) {
        this.gateway = gateway;
        this.cache = cache;
        makeAutoObservable(this);
    }

    getData(key: string): DataSourceData | undefined {
        const cacheItem = this.cache.getItem(cache => {
            return cache.key === key;
        });

        return cacheItem ? cacheItem.data : undefined;
    }

    async resolveData(request: DataRequest): Promise<void> {
        const cacheItem = this.cache.getItem(cache => {
            return cache.key === request.getKey();
        });

        const requestChecksum = await request.getChecksum();

        if (cacheItem) {
            if (cacheItem.checksum === requestChecksum) {
                return;
            }
        }

        const dataSourceData = await this.gateway.execute(request);

        console.log("dataSourceData", dataSourceData);

        const newCache: DataSourceCache = {
            data: dataSourceData,
            key: request.getKey(),
            checksum: requestChecksum
        };

        if (cacheItem) {
            this.cache.updateItems(item => {
                if (item.key === request.getKey()) {
                    return newCache;
                }

                return item;
            });
        } else {
            this.cache.addItems([newCache]);
        }
    }
}
