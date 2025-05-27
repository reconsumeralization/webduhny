import type { IGetIdentityGateway } from "./IGetIdentityGateway";
import type { AcoContext } from "~/types";

export class GetIdentityGatewayFromContext implements IGetIdentityGateway {
    private context: AcoContext;

    constructor(context: AcoContext) {
        this.context = context;
    }

    execute() {
        return this.context.security.getIdentity();
    }
}
