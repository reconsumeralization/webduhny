import type { AcoContext } from "~/types";
import type { IListTeamsGateway } from "./IListTeamsGateway";

export class ListTeamsGatewayFromContext implements IListTeamsGateway {
    private context: AcoContext;

    constructor(context: AcoContext) {
        this.context = context;
    }

    public async execute() {
        const { security } = this.context;

        return security.withoutAuthorization(async () => {
            return security.listTeams();
        });
    }
}
