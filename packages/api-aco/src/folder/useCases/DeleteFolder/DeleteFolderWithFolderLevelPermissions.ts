import { FolderLevelPermissions } from "~/flp";
import type { IDeleteFolder } from "./IDeleteFolder";
import type { DeleteFolderParams } from "~/folder/folder.types";

export class DeleteFolderWithFolderLevelPermissions implements IDeleteFolder {
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly decoretee: IDeleteFolder;

    constructor(folderLevelPermissions: FolderLevelPermissions, decoretee: IDeleteFolder) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.decoretee = decoretee;
    }

    async execute(params: DeleteFolderParams) {
        const flp = await this.folderLevelPermissions.getFolderLevelPermission(params.id);
        await this.folderLevelPermissions.ensureCanAccessFolder({
            flp,
            rwd: "d"
        });
        await this.decoretee.execute(params);
        return true;
    }
}
