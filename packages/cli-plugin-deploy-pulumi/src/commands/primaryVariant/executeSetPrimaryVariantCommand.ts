import type { Context } from "~/types";
import { getDeployedSystems } from "./getDeployedSystems";

export interface IExecuteSetPrimaryVariantCommandParams {
    env: string;
    primary: string;
    secondary: string;
    context: Context;
}

export const executeSetPrimaryVariantCommand = async (
    params: IExecuteSetPrimaryVariantCommandParams
): Promise<void> => {
    const { primary, secondary } = await getDeployedSystems({
        ...params
    });
};
