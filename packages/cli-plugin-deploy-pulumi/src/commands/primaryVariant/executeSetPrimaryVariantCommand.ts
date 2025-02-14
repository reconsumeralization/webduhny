import type { Context } from "~/types";
import { getDeployedSystems } from "./getDeployedSystems";
import { createSystemConnection } from "./SystemConnection";
import type { IExecuteSetPrimaryVariantCommandParams } from "./types";

const callingCommand = 1;
export const executeSetPrimaryVariantCommand = async (
    inputs: IExecuteSetPrimaryVariantCommandParams,
    context: Context
): Promise<void> => {
    const { confirm } = inputs;
    const { primary, secondary } = await getDeployedSystems({
        context,
        env: inputs.env,
        primary: inputs.primary,
        secondary: inputs.secondary
    });
    if (!confirm) {
        context.error(
            `Primary variant${
                inputs.primary ? ` "${inputs.primary}"` : ""
            } is not confirmed. Please add "--confirm" argument to your command to actually deploy changes.`
        );
        return;
    }

    const connection = createSystemConnection({
        context,
        primary,
        secondary
    });

    await connection.build();

    console.log(
        JSON.stringify({
            primary,
            secondary
        })
    );
};
