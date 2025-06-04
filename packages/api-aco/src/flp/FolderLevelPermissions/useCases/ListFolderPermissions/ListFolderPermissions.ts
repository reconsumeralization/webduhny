import type { IListFolderPermissions } from "./IListFolderPermissions";
import type { AcoFolderLevelPermissionsCrud, ListFlpsParams } from "~/flp/flp.types";

export class ListFolderPermissions implements IListFolderPermissions {
    private readonly crud: AcoFolderLevelPermissionsCrud["list"];

    constructor(crud: AcoFolderLevelPermissionsCrud["list"]) {
        this.crud = crud;
    }

    async execute(params: ListFlpsParams) {
        return this.crud(params);
    }
}
