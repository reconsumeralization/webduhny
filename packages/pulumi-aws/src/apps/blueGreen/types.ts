export interface IBlueGreenDomain {
    name: string;
    domains: {
        api: string;
        admin: string;
        website: string | undefined;
        preview: string | undefined;
    };
}

export interface IBlueGreenSources {
    api: string;
    admin: string;
    /**
     * Website and preview are optional, but we want to force our users to write undefined so they don't forget about those.
     */
    website: string | undefined;
    preview: string | undefined;
}

export type IBlueGreenDomains = [IBlueGreenDomain, IBlueGreenDomain];

export interface IBlueGreenDeployment {
    /**
     * Name by this deployment will be accessible in the Pulumi program.
     */
    name: string;
    env: string;
    variant: string | undefined;
}
