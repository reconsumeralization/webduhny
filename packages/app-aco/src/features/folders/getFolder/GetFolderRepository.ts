import { Folder } from "../Folder";
import { ListCache } from "../cache";
import { IGetFolderRepository } from "./IGetFolderRepository";
import { IGetFolderGateway } from "./IGetFolderGateway";

export class GetFolderRepository implements IGetFolderRepository {
    private cache: ListCache<Folder>;
    private gateway: IGetFolderGateway;

    constructor(cache: ListCache<Folder>, gateway: IGetFolderGateway) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(id: string) {
        const response = await this.gateway.execute(id);
        this.cache.addItems([Folder.create(response)]);
    }
}
