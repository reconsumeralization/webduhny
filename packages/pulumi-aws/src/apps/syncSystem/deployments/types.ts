import type { IDefaultStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils/index.js";

export interface ICoreStackOutput extends IDefaultStackOutput {}

export interface IApiStackOutput extends IDefaultStackOutput {}

export interface IDeploymentStack {
    name: string;
    env: string;
    variant: string | undefined;
    core: ICoreStackOutput;
    api: IApiStackOutput;
}

export type IDeploymentStacks = [IDeploymentStack, IDeploymentStack];
