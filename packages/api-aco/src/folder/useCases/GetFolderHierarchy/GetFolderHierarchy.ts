import type { IGetFolderHierarchy } from "./IGetFolderHierarchy";
import { ROOT_FOLDER } from "~/constants";
import type {
    AcoFolderStorageOperations,
    Folder,
    GetFolderHierarchyParams
} from "~/folder/folder.types";

const FIXED_FOLDER_LISTING_LIMIT = 10_000;

export class GetFolderHierarchy implements IGetFolderHierarchy {
    private readonly listOperation: AcoFolderStorageOperations["listFolders"];
    private readonly getOperation: AcoFolderStorageOperations["getFolder"];

    constructor(
        listOperation: AcoFolderStorageOperations["listFolders"],
        getOperation: AcoFolderStorageOperations["getFolder"]
    ) {
        this.listOperation = listOperation;
        this.getOperation = getOperation;
    }

    async execute(params: GetFolderHierarchyParams) {
        const parents: Folder[] = [];
        const siblings: Folder[] = [];

        const [rootFolders] = await this.listOperation({
            where: { type: params.type, parentId: null },
            limit: FIXED_FOLDER_LISTING_LIMIT
        });

        siblings.push(...rootFolders);

        if (params.id === ROOT_FOLDER) {
            return {
                parents,
                siblings
            };
        }

        const folder = await this.getOperation({ id: params.id });
        parents.push(folder);

        const getFolderParent = async (folder: Folder) => {
            while (folder.parentId) {
                const parentFolder = await this.getOperation({ id: folder.parentId });
                parents.push(parentFolder);
                folder = parentFolder;
            }
        };

        await getFolderParent(folder);

        const parentIds = parents.map(folder => folder.id);

        const [childFolders] = await this.listOperation({
            where: { type: folder.type, parentId_in: parentIds, id_not_in: parentIds },
            limit: FIXED_FOLDER_LISTING_LIMIT
        });

        siblings.push(...childFolders);

        return {
            parents,
            siblings
        };
    }
}
