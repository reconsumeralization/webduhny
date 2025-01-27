import { Context, IProjectApplicationPackage, IUserCommandInput } from "../../../types";

export interface IBasePackagesWatcherParams {
    packages: IProjectApplicationPackage[];
    inputs: IUserCommandInput;
    context: Context;
}

export class BasePackagesWatcher {
    public readonly packages: IProjectApplicationPackage[];
    public readonly inputs: IUserCommandInput;
    public readonly context: Context;

    public constructor({ packages, inputs, context }: IBasePackagesWatcherParams) {
        this.packages = packages;
        this.inputs = inputs;
        this.context = context;
    }

    public async watch(): Promise<void> {
        throw new Error("Not implemented.");
    }
}
