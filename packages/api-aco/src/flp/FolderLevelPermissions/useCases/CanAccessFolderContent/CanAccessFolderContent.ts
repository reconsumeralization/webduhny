import type {
    CanAccessFolderContentParams,
    ICanAccessFolderContent
} from "./ICanAccessFolderContent";
import type { IGetIdentityGateway } from "../../gateways";

export class CanAccessFolderContent implements ICanAccessFolderContent {
    private getIdentityGateway: IGetIdentityGateway;

    constructor(getIdentityGateway: IGetIdentityGateway) {
        this.getIdentityGateway = getIdentityGateway;
    }

    async execute({ permissions = [], rwd }: CanAccessFolderContentParams) {
        const identity = this.getIdentityGateway.execute();

        const currentIdentityPermission = permissions.find(p => {
            return p.target === `admin:${identity.id}`;
        });

        if (!currentIdentityPermission) {
            return false;
        }

        // If the user is not an owner and we're checking for "write" or
        // "delete" access, then we can immediately return false.
        if (rwd !== "r") {
            const { level } = currentIdentityPermission;
            return level !== "viewer";
        }

        return true;
    }
}
