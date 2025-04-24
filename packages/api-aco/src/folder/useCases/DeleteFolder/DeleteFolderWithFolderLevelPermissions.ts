import type { AcoFolderStorageOperations, DeleteFolderParams } from "~/folder/folder.types";
import type { IDeleteFolder } from "~/folder/useCases/DeleteFolder/IDeleteFolder";
import { FolderLevelPermissions } from "~/utils/FolderLevelPermissions";

export class DeleteFolderWithFolderLevelPermissions implements IDeleteFolder {
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly getOperation: AcoFolderStorageOperations["getFolder"];
    private readonly decoretee: IDeleteFolder;

    constructor(
        folderLevelPermissions: FolderLevelPermissions,
        getOperation: AcoFolderStorageOperations["getFolder"],
        decoretee: IDeleteFolder
    ) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.getOperation = getOperation;
        this.decoretee = decoretee;
    }

    async execute(params: DeleteFolderParams) {
        const folder = await this.getOperation({ id: params.id });
        await this.folderLevelPermissions.ensureCanAccessFolder({
            folder,
            rwd: "d"
        });
        await this.decoretee.execute(params);
        return true;
    }
}
