import * as aws from "@pulumi/aws";
import { type PulumiApp, type PulumiAppResource } from "@webiny/pulumi";

export interface IAttachDomainsToOutputParams {
    app: PulumiApp;
    cloudFront: PulumiAppResource<typeof aws.cloudfront.Distribution>;
}

export const attachDomainsToOutput = (params: IAttachDomainsToOutputParams) => {
    const { app, cloudFront } = params;

    app.addHandler(() => {
        const distributionDomain = cloudFront.output.domainName;
        const distributionUrl = distributionDomain.apply(value => `https://${value}`);

        app.addOutputs({
            ["distributionDomain"]: distributionDomain,
            ["distributionUrl"]: distributionUrl,
            ["domains"]: []
        });
        // We're adjusting the outputs via the `config.aliases` setter.
        // At the time of implementing this, could not find a better solution.
        cloudFront.config.aliases(aliases => {
            const domains: string[] = [];

            for (const alias of aliases || []) {
                domains.push(alias);
            }

            if (domains.length === 0) {
                domains.push("No domains attached.");
            }

            app.addOutputs({
                ["domains"]: domains
            });

            return aliases;
        });
    });
};
