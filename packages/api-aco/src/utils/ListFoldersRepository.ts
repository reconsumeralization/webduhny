import { folderCacheFactory } from "~/utils/FoldersCacheFactory";
import { Folder, ListFoldersParams } from "~/folder/folder.types";
import { ListMeta } from "~/types";

export interface ListFoldersRepositoryParams {
    gateway: (params: ListFoldersParams) => Promise<[Folder[], ListMeta]>;
}

export class ListFoldersRepository {
    private readonly gateway: (params: ListFoldersParams) => Promise<[Folder[], ListMeta]>;

    constructor(params: ListFoldersRepositoryParams) {
        this.gateway = params.gateway;
    }

    public async execute(folderType: string): Promise<Folder[]> {
        if (folderCacheFactory.hasCache(folderType)) {
            return folderCacheFactory.getCache(folderType).getItems();
        }

        let hasMoreItems: ListMeta["hasMoreItems"] = true;
        let cursor: ListMeta["cursor"] = null;

        while (hasMoreItems) {
            const response: [Folder[], ListMeta] = await this.gateway({
                where: { type: folderType },
                after: cursor
            });

            const [folders, meta] = response;

            folderCacheFactory.getCache(folderType).addItems(folders);
            hasMoreItems = meta.hasMoreItems;
            cursor = meta.cursor;
        }

        return folderCacheFactory.getCache(folderType).getItems();
    }
}
