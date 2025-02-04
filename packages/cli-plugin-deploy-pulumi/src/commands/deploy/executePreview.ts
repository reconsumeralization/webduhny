import { Context, IPulumi, IUserCommandInput } from "~/types";
import {
    createEnvConfiguration,
    withEnv,
    withEnvVariant,
    withProjectName,
    withPulumiConfigPassphrase,
    withRegion
} from "~/utils/env";

export interface IExecutePreviewParams {
    inputs: IUserCommandInput;
    context: Context;
    pulumi: Pick<IPulumi, "run">;
}

export const executePreview = async ({ inputs, context, pulumi }: IExecutePreviewParams) => {
    const subprocess = pulumi.run({
        command: "preview",
        args: {
            diff: true,
            debug: !!inputs.debug
            // Preview command does not accept "--secrets-provider" argument.
            // secretsProvider: PULUMI_SECRETS_PROVIDER
        },
        execa: {
            env: createEnvConfiguration({
                configurations: [
                    withRegion(inputs),
                    withEnv(inputs),
                    withEnvVariant(inputs),
                    withProjectName(context),
                    withPulumiConfigPassphrase()
                ]
            })
        }
    });
    subprocess.stdout!.pipe(process.stdout);
    subprocess.stderr!.pipe(process.stderr);

    await subprocess;

    context.success(`Preview successful.`);
};
