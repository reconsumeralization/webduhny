import { BasePackagesBuilder } from "./BasePackagesBuilder";
import { gray } from "chalk";
import { Context } from "../../types";

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
        build: (options: IOptions) => Promise<void>;
    };
}

interface ILoadedConfigResult extends IConfigResult {
    (params: ILoadedConfigResultParams): IConfigResult;
}

export class SinglePackageBuilder extends BasePackagesBuilder {
    public override async build() {
        const pkg = this.packages[0];
        const context = this.context;
        const inputs = this.inputs;

        const { env, debug } = inputs;

        const pkgName = pkg.name;
        const pkgRelativePath = gray(`(${pkg.paths.relative})`);
        context.info(`Building %s package...`, `${pkgName} ${pkgRelativePath}`);

        const options: IOptions = {
            env,
            debug,
            cwd: pkg.paths.root,
            // Not much sense in turning off logs when a single package is being built.
            logs: true
        };
        const loadedConfig = await this.loadConfig(pkg.paths.config);
        let config: IConfigResult;
        if (typeof loadedConfig === "function") {
            config = loadedConfig({ options, context });
        } else {
            config = loadedConfig;
        }

        const hasBuildCommand = config.commands && typeof config.commands.build === "function";
        if (!hasBuildCommand) {
            throw new Error("Build command not found.");
        }

        await config.commands.build(options);
    }

    private async loadConfig(target: string): Promise<ILoadedConfigResult> {
        return await import(target);
    }
}
