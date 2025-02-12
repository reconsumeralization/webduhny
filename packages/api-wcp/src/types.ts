import { Context } from "@webiny/api/types";
import { ILicense, ProjectPackageFeatures, WcpProjectEnvironment } from "@webiny/wcp/types";
import { WCP_FEATURE_LABEL } from "@webiny/wcp";

export interface WcpContext extends Context {
    wcp: WcpContextObject;
}

export interface WcpContextObject extends ILicense {
    getProject: () => WcpProject | null;
    getProjectLicense: () => ILicense;
    getProjectEnvironment: () => WcpProjectEnvironment | null;
    ensureCanUseFeature: (featureId: keyof typeof WCP_FEATURE_LABEL) => void;
    incrementSeats: () => Promise<void>;
    decrementSeats: () => Promise<void>;
    incrementTenants: () => Promise<void>;
    decrementTenants: () => Promise<void>;
}

export interface CachedWcpProjectLicense {
    cacheKey: string | null;
    project: WcpProject | null;
    license: ILicense;
}

export type AaclPermission = {
    name: "aacl";
    legacy: boolean;
    teams: boolean;
};

export interface WcpProject {
    orgId: string;
    projectId: string;
    package: {
        features: ProjectPackageFeatures;
    };
}
