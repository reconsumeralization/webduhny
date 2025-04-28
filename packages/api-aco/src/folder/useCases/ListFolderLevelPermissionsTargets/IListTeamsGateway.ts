import type { Team } from "@webiny/api-security/types";

export interface IListTeamsGateway {
    execute: () => Promise<Team[]>;
}
