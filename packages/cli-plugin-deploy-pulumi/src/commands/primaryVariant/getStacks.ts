import type { IStack } from "~/utils/stacks";
import { getApplicationsStacksOutput } from "~/utils/stacks";
import type { IStackOutput } from "~/utils";
import { GracefulError } from "~/utils";
import type { Context } from "~/types";

export interface IGetStacksParams {
    env: string;
    primary: string;
    secondary: string;
    context: Context;
}

export interface IGetStacksResult {
    primary: IStack<IStackOutput>[];
    secondary: IStack<IStackOutput>[];
}

interface IValidateVariantNamesParams {
    primary: string;
    secondary: string;
}

const validateVariantNames = (params: IValidateVariantNamesParams): void => {
    const { primary, secondary } = params;

    /**
     * We cannot check primary/secondary variables with ! because one of them might be empty - systems deployed without a variant.
     * Both cannot be empty.
     *
     * Also, primary and secondary variants cannot be the same.
     */
    if (!primary && !secondary) {
        throw new GracefulError("Primary and secondary variants cannot be empty.");
    } else if (primary === secondary) {
        throw new GracefulError("Primary and secondary variants cannot be the same.");
    }
};

export const getStacks = async (params: IGetStacksParams): Promise<IGetStacksResult> => {
    const { env, context } = params;
    validateVariantNames(params);

    const applications = Object.values(context.project.config.appAliases);
    const requiredStacks = applications.length;

    const stacks = await getApplicationsStacksOutput({
        cwd: context.project.root,
        env,
        context,
        applications
    });

    const primaryStacks = stacks.filter(stack => stack.variant === params.primary);
    if (primaryStacks.length !== requiredStacks) {
        throw new GracefulError(`Primary variant "${params.primary}" not found.`);
    }

    const secondaryStacks = stacks.filter(stack => stack.variant === params.secondary);
    if (secondaryStacks.length !== requiredStacks) {
        throw new GracefulError(`Secondary variant "${params.secondary}" not found.`);
    }

    return {
        primary: primaryStacks,
        secondary: secondaryStacks
    };
};
