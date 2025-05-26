import isEqual from "lodash/isEqual";
import { Permissions } from "@webiny/shared-aco";
import { IUpdateFolderRepository } from "./IUpdateFolderRepository";
import { ListCache } from "../cache";
import { Folder } from "../Folder";

export class UpdateFolderRepositoryWithPermissionsChange implements IUpdateFolderRepository {
    private cache: ListCache<Folder>;
    private decoretee: IUpdateFolderRepository;

    constructor(cache: ListCache<Folder>, decoretee: IUpdateFolderRepository) {
        this.cache = cache;
        this.decoretee = decoretee;
    }

    async execute(folder: Folder) {
        const folderPermissions = [...folder.permissions];
        const cachedFolderPermissions = this.cache.getItem(f => f.id === folder.id)?.permissions;

        // Let's run the original use case and update the folder.
        await this.decoretee.execute(folder);

        if (!cachedFolderPermissions) {
            // If the folder is not in the cache, we can't proceed to update its children permissions.
            return;
        }

        if (isEqual(cachedFolderPermissions, folderPermissions)) {
            // If the permissions are the same, we don't need to update anything.
            return;
        }

        const directChildren = this.listDirectChildren(folder);
        if (!directChildren.length) {
            // If the folder has no direct children, we don't need to update anything.
            return;
        }

        this.updateChildrenPermissionsRecursively(directChildren, folder);
    }

    private updateChildrenPermissionsRecursively(children: Folder[], parentFolder: Folder) {
        for (const child of children) {
            let updatedChild: Folder | undefined;

            this.cache.updateItems(f => {
                if (f.id === child.id) {
                    const permissions = Permissions.create(f.permissions, parentFolder);
                    const updated = Folder.create({
                        ...f,
                        permissions
                    });

                    // We are updating the folder in the cache with new permissions, but also storing a copy locally to use for its children.
                    updatedChild = updated;
                    return updated;
                }
                return f;
            });

            // Use the updated child (with new permissions) as the parent for its children
            if (updatedChild) {
                const grandChildren = this.listDirectChildren(updatedChild);
                if (grandChildren.length) {
                    this.updateChildrenPermissionsRecursively(grandChildren, updatedChild);
                }
            }
        }
    }

    private listDirectChildren(folder: Folder) {
        return this.cache.getItems().filter(f => f.parentId === folder.id);
    }
}
