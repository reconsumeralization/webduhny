import type { Context } from "~/types";
import { getDeployedSystems } from "./getDeployedSystems";

export interface IExecuteSetPrimaryVariantCommandParams {
    confirm: boolean;
    env: string;
    primary: string | undefined;
    secondary: string | undefined;
    context: Context;
}

export const executeSetPrimaryVariantCommand = async (
    params: IExecuteSetPrimaryVariantCommandParams
): Promise<void> => {
    const { context, confirm } = params;
    const { primary, secondary } = await getDeployedSystems(params);
    if (!confirm) {
        context.error(
            `Primary variant${
                params.primary ? ` "${params.primary}"` : ""
            } is not confirmed. Please add "--confirm" argument to your command to actually deploy changes.`
        );
        return;
    }
    console.log(
        JSON.stringify({
            primary,
            secondary
        })
    );
};
