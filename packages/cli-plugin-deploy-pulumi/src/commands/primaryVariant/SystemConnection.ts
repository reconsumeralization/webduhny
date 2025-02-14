import { IDeployedSystem } from "./DeployedSystem";
import { Context } from "~/types";

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
        // Build the connection between primary and secondary systems.
        return Promise.resolve();
    }
}

export const createSystemConnection = (params: ISystemConnectionParams): ISystemConnection => {
    return new SystemConnection(params);
};
