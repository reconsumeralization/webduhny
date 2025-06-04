import { ListCache } from "../cache";
import { Folder } from "../Folder";
import { IListFoldersByParentIdsGateway } from "./IListFoldersByParentIdsGateway";
import {
    IListFoldersByParentIdsRepository,
    ListFoldersByParentIdsRepositoryParams
} from "./IListFoldersByParentIdsRepository";

export class ListFoldersByParentIdsRepository implements IListFoldersByParentIdsRepository {
    private cache: ListCache<Folder>;
    private gateway: IListFoldersByParentIdsGateway;
    private readonly type: string;

    constructor(cache: ListCache<Folder>, gateway: IListFoldersByParentIdsGateway, type: string) {
        this.cache = cache;
        this.gateway = gateway;
        this.type = type;
    }

    async execute(params: ListFoldersByParentIdsRepositoryParams) {
        const items = await this.gateway.execute({ type: this.type, parentIds: params.parentIds });
        this.cache.addItems(items.map(item => Folder.create(item)));
    }
}
