import type { DecryptedWcpProjectLicense } from "@webiny/wcp/types";

export type WcpProject = DecryptedWcpProjectLicense;

export interface GetWcpProjectGqlResponse {
    wcp: {
        getProject: {
            data: WcpProject | null;
            error: {
                message: string;
                code: string;
                data: Record<string, any>;
            } | null;
        };
    };
}

export interface AaclPermission {
    name: "aacl";
    legacy: boolean;
    teams: boolean;
}
