import type { DeleteFolderParams } from "~/folder/folder.types";
import type { IGetFolder } from "~/folder/useCases/GetFolder/IGetFolder";
import { FolderLevelPermissions } from "~/utils/FolderLevelPermissions";

export class GetFolderWithFolderLevelPermissions implements IGetFolder {
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly decoretee: IGetFolder;

    constructor(folderLevelPermissions: FolderLevelPermissions, decoretee: IGetFolder) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.decoretee = decoretee;
    }

    async execute(params: DeleteFolderParams) {
        const folder = await this.decoretee.execute(params);
        await this.folderLevelPermissions.ensureCanAccessFolder({
            folder,
            rwd: "r"
        });
        return folder;
    }
}
