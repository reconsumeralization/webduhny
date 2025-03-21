import { IUpdateFolderRepository } from "./IUpdateFolderRepository";
import { ListCache } from "../cache";
import { Folder } from "../Folder";
import { IUpdateFolderGateway } from "./IUpdateFolderGateway";
import { FolderDto } from "./FolderDto";

export class UpdateFolderRepository implements IUpdateFolderRepository {
    private cache: ListCache<Folder>;
    private gateway: IUpdateFolderGateway;

    constructor(cache: ListCache<Folder>, gateway: IUpdateFolderGateway) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(folder: Folder) {
        const dto: FolderDto = {
            id: folder.id,
            title: folder.title,
            slug: folder.slug,
            permissions: folder.permissions,
            parentId: folder.parentId,
            extensions: folder.extensions
        };

        const result = await this.gateway.execute(dto);

        this.cache.updateItems(f => {
            if (f.id === folder.id) {
                return Folder.create(result);
            }

            return Folder.create(f);
        });
    }
}
