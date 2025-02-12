import { GracefulError, IStackOutput } from "~/utils";
import { IStack } from "~/utils/stacks/Stack";

export interface IDeployedSystem {
    readonly env: string;
    readonly variant: string | undefined;
    readonly stacks: IStack<IStackOutput>[];
    getStack<T extends IStackOutput = IStackOutput>(app: string): IStack<T>;
}

export interface IDeployedSystemParams {
    env: string;
    variant: string | undefined;
    stacks: IStack<IStackOutput>[];
}

export class DeployedSystem implements IDeployedSystem {
    public readonly env: string;
    public readonly variant: string | undefined;
    public readonly stacks: IStack<IStackOutput>[];

    public constructor(params: IDeployedSystemParams) {
        this.env = params.env;
        this.variant = params.variant;
        this.stacks = params.stacks;
    }

    public getStack<T extends IStackOutput = IStackOutput>(app: string): IStack<T> {
        const stack = this.stacks.find(stack => stack.app === app);
        if (!stack) {
            throw new GracefulError(`Stack for application "${app}" not found.`);
        }
        return stack as IStack<T>;
    }
}

export interface ICreateDeployedSystemFactoryParams {
    applications: string[];
}

export interface ICreateDeployedSystem {
    (params: Pick<IDeployedSystemParams, "stacks">): IDeployedSystem;
}

export interface ICreateDeployedSystemFactory {
    (params: ICreateDeployedSystemFactoryParams): ICreateDeployedSystem;
}

export const createDeployedSystemFactory: ICreateDeployedSystemFactory = ({ applications }) => {
    return params => {
        if (!params.stacks.length) {
            throw new GracefulError(`No stacks found for the system.`);
        }
        const { env, variant } = params.stacks[0];

        for (const app of applications) {
            const exists = params.stacks.some(stack => stack.folder === app);
            if (!exists) {
                throw new GracefulError(
                    `Stack for application "${app}" is missing in system env "${env}", variant "${
                        variant || ""
                    }".`
                );
            }
        }
        return new DeployedSystem({
            ...params,
            env,
            variant
        });
    };
};
