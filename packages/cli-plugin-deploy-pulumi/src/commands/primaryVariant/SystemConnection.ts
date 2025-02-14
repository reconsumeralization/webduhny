import ora from "ora";
import type { IDeployedSystem } from "./DeployedSystem";
import type { Context } from "~/types";

export interface ISystemConnection {
    readonly context: Context;
    readonly primary: IDeployedSystem;
    readonly secondary: IDeployedSystem;

    build(): Promise<void>;
}

export interface ISystemConnectionParams {
    context: Context;
    primary: IDeployedSystem;
    secondary: IDeployedSystem;
}

export class SystemConnection implements ISystemConnection {
    public readonly context: Context;
    public readonly primary: IDeployedSystem;
    public readonly secondary: IDeployedSystem;

    public constructor(params: ISystemConnectionParams) {
        this.context = params.context;
        this.primary = params.primary;
        this.secondary = params.secondary;
    }

    public async build(): Promise<void> {
        const spinner = ora();

        const message = "Building connection system...";
        spinner.start(message);
        // Build the connection between primary and secondary systems.
        await new Promise<void>(resolve => {
            setTimeout(resolve, 1000);
        });

        spinner.succeed(`${message} done.`);
    }
}

export const createSystemConnection = (params: ISystemConnectionParams): ISystemConnection => {
    return new SystemConnection(params);
};
