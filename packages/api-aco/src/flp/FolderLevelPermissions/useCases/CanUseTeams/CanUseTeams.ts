import type { ICanUseTeams } from "./ICanUseTeams";
import type { IGetWcpGateway } from "~/flp/FolderLevelPermissions/gateways/GetWcpGateway";

export class CanUseTeams implements ICanUseTeams {
    private getWcpGateway: IGetWcpGateway;

    constructor(getWcpGateway: IGetWcpGateway) {
        this.getWcpGateway = getWcpGateway;
    }

    execute() {
        return this.getWcpGateway.execute().canUseTeams();
    }
}
