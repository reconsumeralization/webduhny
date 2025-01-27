import { IUserCommandInput, ProjectApplication } from "../../types";
import { login } from "../../utils/login";
import { getStackName } from "../../utils/getStackName";

export interface IPulumiLoginSelectStackParams {
    inputs: Pick<IUserCommandInput, "env" | "variant">;
    projectApplication: Pick<ProjectApplication, "paths" | "project">;
    pulumi: unknown;
}

export const pulumiLoginSelectStack = async ({
    inputs,
    projectApplication,
    pulumi
}: IPulumiLoginSelectStackParams) => {
    const { env, variant } = inputs;

    await login(projectApplication);

    const PULUMI_SECRETS_PROVIDER = process.env.PULUMI_SECRETS_PROVIDER;
    const PULUMI_CONFIG_PASSPHRASE = process.env.PULUMI_CONFIG_PASSPHRASE;

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
            env: {
                PULUMI_CONFIG_PASSPHRASE
            }
        }
    });
};
