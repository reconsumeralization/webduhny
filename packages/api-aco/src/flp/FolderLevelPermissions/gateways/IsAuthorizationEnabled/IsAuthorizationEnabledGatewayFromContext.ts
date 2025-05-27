import type { IIsAuthorizationEnabledGateway } from "./IIsAuthorizationEnabledGateway";
import type { AcoContext } from "~/types";

export class IsAuthorizationEnabledGatewayFromContext implements IIsAuthorizationEnabledGateway {
    private context: AcoContext;

    constructor(context: AcoContext) {
        this.context = context;
    }

    execute() {
        return this.context.security.isAuthorizationEnabled();
    }
}
