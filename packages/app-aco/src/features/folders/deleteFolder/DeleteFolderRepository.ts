import { IDeleteFolderRepository } from "./IDeleteFolderRepository";
import { ListCache } from "../cache";
import { Folder } from "../Folder";
import { IDeleteFolderGateway } from "./IDeleteFolderGateway";

export class DeleteFolderRepository implements IDeleteFolderRepository {
    private cache: ListCache<Folder>;
    private gateway: IDeleteFolderGateway;

    constructor(cache: ListCache<Folder>, gateway: IDeleteFolderGateway) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(folder: Folder) {
        await this.gateway.execute(folder.id);
        this.cache.removeItems(f => f.id === folder.id);
    }
}
