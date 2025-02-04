import { IPulumi, IUserCommandInput, ProjectApplication } from "~/types";
import { getStackName, login } from "~/utils";
import { createEnvConfiguration, withPulumiConfigPassphrase } from "~/utils/env";

export interface IPulumiLoginSelectStackParams {
    inputs: Pick<IUserCommandInput, "env" | "variant" | "region" | "folder">;
    projectApplication: Pick<ProjectApplication, "paths" | "project">;
    pulumi: Pick<IPulumi, "run">;
}

export const pulumiLoginSelectStack = async ({
    inputs,
    projectApplication,
    pulumi
}: IPulumiLoginSelectStackParams) => {
    const { env, variant } = inputs;

    await login(projectApplication);

    const PULUMI_SECRETS_PROVIDER = process.env.PULUMI_SECRETS_PROVIDER as string;

    const stackName = getStackName({
        env,
        variant
    });

    await pulumi.run({
        command: ["stack", "select", stackName],
        args: {
            create: true,
            secretsProvider: PULUMI_SECRETS_PROVIDER
        },
        execa: {
            env: createEnvConfiguration({
                configurations: [withPulumiConfigPassphrase()]
            })
        }
    });
};
