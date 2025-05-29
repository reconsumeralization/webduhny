import type { AcoFolderLevelPermissionsCrud } from "~/flp/flp.types";
import type { IGetFolderPermission } from "./IGetFolderPermission";

export class GetFolderPermission implements IGetFolderPermission {
    private readonly crud: AcoFolderLevelPermissionsCrud["get"];

    constructor(crud: AcoFolderLevelPermissionsCrud["get"]) {
        this.crud = crud;
    }

    public async execute(id: string) {
        return this.crud(id);
    }
}
