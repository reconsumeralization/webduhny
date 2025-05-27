import { LoadedCache } from "../cache";
import {
    IListFoldersByParentIdsRepository,
    ListFoldersByParentIdsRepositoryParams
} from "./IListFoldersByParentIdsRepository";

export class ListFoldersByParentIdsRepositoryWithLoadedCache
    implements IListFoldersByParentIdsRepository
{
    private loadedCache: LoadedCache;
    private repository: IListFoldersByParentIdsRepository;

    constructor(loadedCache: LoadedCache, repository: IListFoldersByParentIdsRepository) {
        this.loadedCache = loadedCache;
        this.repository = repository;
    }

    async execute(params: ListFoldersByParentIdsRepositoryParams) {
        if (this.loadedCache.count() === 0) {
            await this.repository.execute(params);
            this.loadedCache.addItems(params.parentIds);
            return;
        }

        const missingParentIds = params.parentIds.filter(
            parentId => !this.loadedCache.getItems().includes(parentId)
        );

        if (missingParentIds.length === 0) {
            return;
        }

        this.loadedCache.addItems(missingParentIds);

        await this.repository.execute({
            parentIds: missingParentIds
        });
    }
}
