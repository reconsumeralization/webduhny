import { BasePackagesBuilder } from "./BasePackagesBuilder";
import { gray } from "chalk";

class SinglePackageBuilder extends BasePackagesBuilder {
    async build() {
        const pkg = this.packages[0];
        const context = this.context;
        const inputs = this.inputs;

        const { env, debug } = inputs;

        const pkgName = pkg.name;
        const pkgRelativePath = gray(`(${pkg.paths.relative})`);
        context.info(`Building %s package...`, `${pkgName} ${pkgRelativePath}`);

        const options = {
            env,
            debug,
            cwd: pkg.paths.root,

            // Not much sense in turning off logs when a single package is being built.
            logs: true
        };
        // TODO left off here
        let config = await this.loadConfig(pkg.paths.config);

        let config = require(pkg.paths.config).default || require(pkg.paths.config);
        if (typeof config === "function") {
            config = config({ options, context });
        }

        const hasBuildCommand = config.commands && typeof config.commands.build === "function";
        if (!hasBuildCommand) {
            throw new Error("Build command not found.");
        }

        await config.commands.build(options);
    }

    private async loadConfig(target: string) {
        const loaded = await import(target);
    }
}

module.exports = { SinglePackageBuilder };
