import { BasePackagesWatcher } from "./BasePackagesWatcher";
import { Context } from "~/types";

interface IOptions {
    env: string;
    debug?: boolean;
    cwd: string;
    logs: boolean;
}

interface ILoadedConfigResultParams {
    options: IOptions;
    context: Context;
}

interface IConfigResult {
    commands: {
        watch: (options: IOptions) => Promise<void>;
    };
}

interface ILoadedConfigResult extends IConfigResult {
    (params: ILoadedConfigResultParams): IConfigResult;
}

export class SinglePackageWatcher extends BasePackagesWatcher {
    public override async watch(): Promise<void> {
        const pkg = this.packages[0];
        const context = this.context;
        const inputs = this.inputs;

        const { env, debug } = inputs;

        const options = {
            env,
            debug,
            cwd: pkg.paths.root,

            // Not much sense in turning off logs when a single package is being built.
            logs: true
        };

        const loadedConfig = this.loadConfig(pkg.paths.config);
        let config: IConfigResult;
        if (typeof loadedConfig === "function") {
            config = loadedConfig({ options, context });
        } else {
            config = loadedConfig;
        }

        const hasWatchCommand = config.commands && typeof config.commands.watch === "function";
        if (!hasWatchCommand) {
            throw new Error("Watch command not found.");
        }

        await config.commands.watch(options);
    }

    private loadConfig(target: string): ILoadedConfigResult {
        const module = require(target);
        return module.default ? module.default : module;
    }
}
