import type { Context } from "~/types";
import { GracefulError } from "~/utils/GracefulError";
import { getApplicationsStacksOutput } from "~/utils/stacks";
import { getStacks } from "./getStacks";

export interface IExecuteSetPrimaryVariantCommandParams {
    env: string;
    primary: string;
    secondary: string;
    context: Context;
}

export const executeSetPrimaryVariantCommand = async (
    params: IExecuteSetPrimaryVariantCommandParams
): Promise<void> => {
    const { primary, secondary } = await getStacks({
        ...params
    });
};
