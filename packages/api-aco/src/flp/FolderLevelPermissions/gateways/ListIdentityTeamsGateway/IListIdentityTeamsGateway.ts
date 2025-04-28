import type { Team } from "@webiny/api-security/types";

export interface IListIdentityTeamsGateway {
    execute: () => Promise<Team[]>;
}
