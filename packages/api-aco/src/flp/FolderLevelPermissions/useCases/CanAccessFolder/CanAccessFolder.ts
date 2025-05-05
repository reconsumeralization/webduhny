import type { CanAccessFolderParams, ICanAccessFolder } from "./ICanAccessFolder";
import type { IGetIdentityGateway } from "../../gateways";

export class CanAccessFolder implements ICanAccessFolder {
    private getIdentityGateway: IGetIdentityGateway;

    constructor(getIdentityGateway: IGetIdentityGateway) {
        this.getIdentityGateway = getIdentityGateway;
    }

    async execute({ permissions = [], rwd, managePermissions }: CanAccessFolderParams) {
        if (!permissions.length) {
            return true;
        }

        const identity = this.getIdentityGateway.execute();
        const currentIdentityPermission = permissions.find(p => {
            return p.target === `admin:${identity.id}`;
        });

        if (!currentIdentityPermission) {
            return false;
        }

        const { level } = currentIdentityPermission;

        if (managePermissions) {
            return level === "owner";
        }

        // Checking for "write" or "delete" access. Allow only if the
        // user is an owner or the folder is public (no FLP assigned).
        if (rwd !== "r") {
            return level === "owner" || level === "public";
        }

        return true;
    }
}
