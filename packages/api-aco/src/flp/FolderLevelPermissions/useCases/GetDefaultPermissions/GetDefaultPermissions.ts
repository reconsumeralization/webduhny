import type { IGetDefaultPermissions } from "./IGetDefaultPermissions";
import type { IGetIdentityGateway, IListPermissionsGateway } from "../../gateways";
import type { FolderPermission } from "~/flp/flp.types";
import { DefaultPermissionsMerger } from "./DefaultPermissionsMerger";

export class GetDefaultPermissions implements IGetDefaultPermissions {
    private getIdentityGateway: IGetIdentityGateway;
    private listPermissionsGateway: IListPermissionsGateway;

    constructor(
        getIdentityGateway: IGetIdentityGateway,
        listPermissionsGateway: IListPermissionsGateway
    ) {
        this.getIdentityGateway = getIdentityGateway;
        this.listPermissionsGateway = listPermissionsGateway;
    }

    async execute(permissions: FolderPermission[]) {
        const identity = this.getIdentityGateway.execute();
        const identityPermissions = await this.listPermissionsGateway.execute();

        return DefaultPermissionsMerger.merge(identity, identityPermissions, permissions);
    }
}
