const Listr = require("listr");
const { BasePackagesBuilder } = require("./BasePackagesBuilder");
const { gray } = require("chalk");
const { measureDuration } = require("../../utils");
const path = require("path");
const { deserializeError } = require("serialize-error");

const WORKER_PATH = path.resolve(__dirname, "worker.js");

class MultiplePackagesBuilder extends BasePackagesBuilder {
    async build() {
        const packages = this.packages;
        const context = this.context;
        const inputs = this.inputs;

        const getBuildDuration = measureDuration();

        context.info(`Building %s packages...`, packages.length);

        const { fork } = require("child_process");
        const tasksList = packages.map(pkg => {
            return {
                title: this.getPackageLabel(pkg),
                task: () => {
                    return new Promise((resolve, reject) => {
                        const buildConfig = JSON.stringify({
                            ...inputs,
                            package: { paths: pkg.paths }
                        });
                        const child = fork(WORKER_PATH, [buildConfig], { silent: true });

                        // We only send one message from the child process, and that is the error, if any.
                        child.on("message", serializedError => {
                            const error = deserializeError(serializedError);
                            reject(new Error("Build failed.", { cause: { pkg, error } }));
                        });

                        // Handle child process error events
                        child.on("error", error => {
                            reject(new Error("Build failed.", { cause: { pkg, error } }));
                        });

                        // Handle child process exit and check for errors
                        child.on("exit", code => {
                            if (code !== 0) {
                                const error = new Error(`Build process exited with code ${code}.`);
                                reject(new Error("Build failed.", { cause: { pkg, error } }));
                                return;
                            }

                            resolve();
                        });
                    });
                }
            };
        });

        const tasks = new Listr(tasksList, { concurrent: true, exitOnError: false });

        await tasks.run().catch(err => {
            console.log();
            context.error(`Failed to build all packages. For more details, check the logs below.`);
            console.log();

            err.errors.forEach((err, i) => {
                const { pkg, error } = err.cause;
                const number = `${i + 1}.`;
                const name = context.error.hl(pkg.name);
                const relativePath = gray(`(${pkg.paths.relative})`);
                const title = [number, name, relativePath].join(" ");

                console.log(title);
                console.log(error.message);

                if (inputs.debug) {
                    console.log(error.stack);
                }
            });

            throw new Error(`Failed to build all packages.`);
        });

        console.log();

        context.success(`Built ${packages.length} packages in ${getBuildDuration()}.`);
    }

    getPackageLabel(pkg) {
        const pkgName = pkg.name;
        const pkgRelativePath = gray(`(${pkg.paths.relative})`);
        return `${pkgName} ${pkgRelativePath}`;
    }
}

module.exports = { MultiplePackagesBuilder };
