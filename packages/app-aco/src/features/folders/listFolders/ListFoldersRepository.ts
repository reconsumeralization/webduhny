import { ListCache } from "../cache";
import { Folder } from "../Folder";
import { IListFoldersGateway } from "./IListFoldersGateway";
import { IListFoldersRepository } from "./IListFoldersRepository";

export class ListFoldersRepository implements IListFoldersRepository {
    private cache: ListCache<Folder>;
    private gateway: IListFoldersGateway;
    private type: string;

    constructor(cache: ListCache<Folder>, gateway: IListFoldersGateway, type: string) {
        this.cache = cache;
        this.gateway = gateway;
        this.type = type;
    }

    async execute() {
        const items = await this.gateway.execute({ type: this.type });
        this.cache.clear();
        this.cache.addItems(items.map(item => Folder.create(item)));
    }
}
