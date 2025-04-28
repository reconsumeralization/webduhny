import type { ICanUseTeams } from "./ICanUseTeams";
import type { AcoContext } from "~/types";

export class CanUseTeams implements ICanUseTeams {
    private context: AcoContext;

    constructor(context: AcoContext) {
        this.context = context;
    }

    execute() {
        return this.context.wcp.canUseTeams();
    }
}
