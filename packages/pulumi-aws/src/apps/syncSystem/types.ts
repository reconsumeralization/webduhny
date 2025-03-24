import type { Provider } from "@pulumi/aws";
export interface IDeployment {
    /**
     * Name by this deployment will be accessible in the Pulumi program.
     */
    name: string;
    env: string;
    variant: string | undefined;
}

export interface RegionProvider {
    provider: Provider;
    name: string;
}
