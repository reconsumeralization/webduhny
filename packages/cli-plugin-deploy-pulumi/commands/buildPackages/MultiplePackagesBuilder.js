const Listr = require("listr");
const { BasePackagesBuilder } = require("./BasePackagesBuilder");
const { gray } = require("chalk");
const { measureDuration } = require("../../utils");
const path = require("path");

const WORKER_PATH = path.resolve(__dirname, "worker.js");

class MultiplePackagesBuilder extends BasePackagesBuilder {
    async build() {
        const packages = this.packages;
        const context = this.context;
        const inputs = this.inputs;

        const getBuildDuration = measureDuration();

        const { env } = inputs;

        context.info(`Building %s packages...`, packages.length);

        const { fork } = require("child_process");
        const tasksList = packages.map(pkg => {
            return {
                title: this.getPackageLabel(pkg),
                task: () => {
                    return new Promise((resolve, reject) => {
                        const buildConfig = JSON.stringify({
                            ...inputs,
                            package: { paths: pkg.paths },
                        });
                        const child = fork(WORKER_PATH, [buildConfig], { silent: true });

                        let errorOutput = "";

                        // Collect error messages from the child process's stderr
                        if (child.stderr) {
                            child.stderr.on("data", data => {
                                errorOutput += data.toString();
                            });
                        }

                        // Handle child process error events
                        child.on("error", err => {
                            console.log("ERRORARARARA");
                            reject(err);
                        });

                        // Handle child process exit and check for errors
                        child.on("exit", code => {
                            if (code !== 0) {
                                const err = new Error("Build failed.", {
                                    cause: { errorOutput, pkg }
                                });
                                reject(err);
                            } else {
                                resolve();
                            }
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
                const { pkg, errorOutput } = err.cause;
                const number = `${i + 1}.`;
                const name = context.error.hl(pkg.name);
                const relativePath = gray(`(${pkg.paths.relative})`);
                const title = [number, name, relativePath].join(" ");

                console.log(title);
                console.log(errorOutput);
                console.log();
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
