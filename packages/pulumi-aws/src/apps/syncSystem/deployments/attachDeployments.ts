import type { PulumiApp } from "@webiny/pulumi";
import type { IDeployment } from "../types.js";
import { getStacks } from "~/apps/syncSystem/deployments/getStacks.js";
import { attachLambdaPolicyToAccessEventBus } from "./attachLambdaPolicyToAccessEventBus.js";

export interface IAttachDeploymentsParams {
    app: PulumiApp;
    deployments: [IDeployment, IDeployment];
}

export const attachDeployments = async (params: IAttachDeploymentsParams) => {
    const { app, deployments } = params;

    const stacks = await getStacks({
        deployments
    });

    // console.log({
    //     stacks: JSON.stringify(stacks)
    // });

    /**
     * First, we need to attach policy to allow deployment access to the Sync System EventBridge.
     */
    const lambdaPolicies = attachLambdaPolicyToAccessEventBus({
        app,
        stacks
    });

    return {
        lambdaPolicies
    };
};
