export type GenericRecord<K extends PropertyKey = PropertyKey, V = any> = Record<K, V>;

export type NonEmptyArray<T> = [T, ...T[]];

export interface IDeploymentDomain {
    /**
     * A name of the deployment (e.g. "green" or "blue").
     */
    name: string;
    domains: {
        api: string;
        admin: string;
        website: string | undefined;
        preview: string | undefined;
    };
}

export type IDeploymentsDomains = [IDeploymentDomain, IDeploymentDomain];

export interface IBlueGreenDeployment {
    /**
     * Name by this deployment will be accessible in the Pulumi program.
     */
    name: string;
    env: string;
    variant: string | undefined;
}

export interface IAttachedDomains {
    acmCertificateArn: string;
    sslSupportMethod?: string;
    domains: {
        api: NonEmptyArray<string>;
        admin: NonEmptyArray<string>;
        website: NonEmptyArray<string> | undefined;
        preview: NonEmptyArray<string> | undefined;
    };
}

export interface IAttachDomainsCallable {
    (): IAttachedDomains;
}

export type IAttachedDomainKey = keyof IAttachedDomains["domains"];

export interface IResolvedDomain {
    /**
     * Name of the deployment (e.g. "green" or "blue").
     */
    name: string;
    /**
     * Type of the domain (e.g. "api", "admin", "website", "preview").
     */
    type: IAttachedDomainKey;
    /**
     * List of domains that will be used as source and transferred to the target domain.
     */
    sources: NonEmptyArray<string>;
    /**
     * The target CloudFront domain of the deployment.
     */
    target: string;
}

export type IResolvedDomains = IResolvedDomain[];
