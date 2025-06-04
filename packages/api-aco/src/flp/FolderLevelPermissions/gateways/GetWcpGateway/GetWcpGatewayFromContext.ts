import type { IGetWcpGateway } from "./IGetWcpGateway";
import type { AcoContext } from "~/types";

export class GetWcpGatewayFromContext implements IGetWcpGateway {
    private context: AcoContext;

    constructor(context: AcoContext) {
        this.context = context;
    }

    execute() {
        return this.context.wcp;
    }
}
