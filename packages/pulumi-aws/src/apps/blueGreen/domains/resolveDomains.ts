import type {
    IAttachedDomainKey,
    IAttachedDomains,
    IDeploymentsDomains,
    IResolvedDomains
} from "../types.js";

export interface IResolveDomainsParams {
    attachedDomains: IAttachedDomains;
    deploymentsDomains: IDeploymentsDomains;
}

export const resolveDomains = (params: IResolveDomainsParams): IResolvedDomains => {
    const { attachedDomains, deploymentsDomains } = params;

    const types = Object.keys(attachedDomains.domains).filter(key => {
        return !!attachedDomains.domains[key as IAttachedDomainKey];
    }) as IAttachedDomainKey[];

    return types.reduce<IResolvedDomains>((output, type) => {
        const value = attachedDomains.domains[type];
        /**
         * Should not happen because we are filtering out undefined values when creating the `types` array.
         */
        if (!value) {
            return output;
        } else if (value.length === 0) {
            throw new Error(`Missing domains for "${type}" deployment.`);
        }
        for (const domain of deploymentsDomains) {
            const target = domain.domains[type];
            if (!target) {
                throw new Error(`Missing "${type}" domain in deployment "${domain.name}".`);
            }

            output.push({
                type,
                env: domain.env,
                variant: domain.variant,
                name: domain.name,
                sources: value,
                target
            });
        }

        return output;
    }, []);
};
