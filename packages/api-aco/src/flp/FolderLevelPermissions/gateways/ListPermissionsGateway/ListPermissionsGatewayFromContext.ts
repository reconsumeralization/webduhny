import type { IListPermissionsGateway } from "./IListPermissionsGateway";
import type { AcoContext } from "~/types";

export class ListPermissionsGatewayFromContext implements IListPermissionsGateway {
    private context: AcoContext;

    constructor(context: AcoContext) {
        this.context = context;
    }

    execute() {
        return this.context.security.listPermissions();
    }
}
