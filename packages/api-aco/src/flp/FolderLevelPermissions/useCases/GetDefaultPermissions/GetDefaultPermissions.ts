import type { IGetDefaultPermissions } from "./IGetDefaultPermissions";
import type { IGetIdentityGateway, IListPermissionsGateway } from "../../gateways";
import type { FolderAccessLevel, FolderPermission } from "~/flp/flp.types";

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
        const hasFullAccess = await this.hasFullAccess();
        const identity = this.getIdentityGateway.execute();

        /**
         * If the user has full access to the application, add a specific "owner" permission to the list.
         * This ensures the user has complete control over the folder.
         */
        if (hasFullAccess) {
            return [
                {
                    target: `admin:${identity.id}`,
                    level: "owner" as FolderAccessLevel,
                    inheritedFrom: "role:full-access"
                },
                /**
                 * Remove any permissions related to the full access user,
                 * as these are always superseded by the "owner" permission defined above.
                 */
                ...permissions.filter(p => p.target !== `admin:${identity.id}`)
            ];
        }

        if (permissions.length > 0) {
            return permissions;
        }

        /**
         * No permissions provided. This means the folder is public.
         * Add a specific "public" permission to the list to ensure the folder is accessible to everyone.
         */
        return [
            {
                target: `admin:${identity.id}`,
                level: "public" as FolderAccessLevel,
                inheritedFrom: "public"
            }
        ];
    }

    private async hasFullAccess(): Promise<boolean> {
        const permissions = await this.listPermissionsGateway.execute();
        return permissions.some(p => p.name === "*");
    }
}
