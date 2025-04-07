import type { IDeployment } from "~/apps/syncSystem/types.js";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils/index.js";
import type {
    IApiStackOutput,
    ICoreStackOutput,
    IDeploymentStack,
    IDeploymentStacks
} from "./types.js";
import kebabCase from "lodash/kebabCase.js";

export interface IGetStacksParams {
    deployments: [IDeployment, IDeployment];
}

const getName = (stack: IDeploymentStack) => {
    return kebabCase([stack.name, stack.env, stack.variant].filter(Boolean).join("-"));
};

export const getStacks = async (params: IGetStacksParams) => {
    const { deployments } = params;
    if (deployments.length !== 2) {
        throw new Error("Please provide two deployments.");
    }

    const promises = deployments.map(async deployment => {
        const corePromise = new Promise<ICoreStackOutput>(resolve => {
            const result = getStackOutput({
                folder: `apps/core`,
                env: deployment.env,
                variant: deployment.variant
            });
            resolve(result);
        });
        const apiPromise = new Promise<IApiStackOutput>(resolve => {
            const result = getStackOutput({
                folder: `apps/api`,
                env: deployment.env,
                variant: deployment.variant
            });
            resolve(result);
        });

        const [core, api] = await Promise.all([corePromise, apiPromise]);

        return {
            name: deployment.name,
            env: deployment.env,
            variant: deployment.variant,
            core,
            api
        };
    });

    const results = await Promise.all(promises);
    /**
     * Let's sort by name, env and variant - so we are positive that stacks will always be in the same order.
     */
    return results.sort((a, b) => {
        const aName = getName(a);
        const bName = getName(b);
        return aName.localeCompare(bName);
    }) as IDeploymentStacks;
};
