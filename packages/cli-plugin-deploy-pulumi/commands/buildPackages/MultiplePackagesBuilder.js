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
                        const buildConfig = { package: { paths: pkg.paths }, env };
                        const child = fork(WORKER_PATH, [JSON.stringify(buildConfig)], {
                            silent: true
                        });

                        child.on("error", err => {
                            reject(err); // Reject the promise with the error
                        });

                        child.on("exit", code => {
                            if (code !== 0) {
                                reject(new Error(`Child process exited with code ${code}`));
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

            err.errors.forEach(({ package: pkg, error }, i) => {
                const number = `${i + 1}.`;
                const name = context.error.hl(pkg.name);
                const relativePath = gray(`(${pkg.paths.relative})`);
                const title = [number, name, relativePath].join(" ");

                console.log(title);
                console.log(error.message);
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
