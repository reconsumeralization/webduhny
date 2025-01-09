const path = require("path");
const chalk = require("chalk");
const { BasePackagesWatcher } = require("./BasePackagesWatcher");
const { getRandomColorForString } = require("../../../utils");
const { fork } = require("child_process");
const { deserializeError } = require("serialize-error");

const WORKER_PATH = path.resolve(__dirname, "worker.js");

class MultiplePackagesWatcher extends BasePackagesWatcher {
    async watch() {
        const packages = this.packages;
        const context = this.context;
        const inputs = this.inputs;

        const { env, debug } = inputs;

        context.info(`Watching %s packages...`, packages.length);

        if (inputs.debug) {
            context.debug("The following packages will be watched for changes:");
            packages.forEach(item => console.log("‣ " + item.name));
        }

        const commandOptions = { env, debug };

        const tasksList = [];

        for (let i = 0; i < packages.length; i++) {
            const pkg = packages[i];
            const log = createLog(pkg.name);

            tasksList.push(
                new Promise(resolve => {
                    const buildConfig = JSON.stringify({
                        ...inputs,
                        package: { paths: pkg.paths }
                    });

                    const child = fork(WORKER_PATH, [buildConfig], {
                        env: { ...process.env, ...commandOptions.env },
                        stdio: ["pipe", "pipe", "pipe", "ipc"] // Use "pipe" to handle custom output
                    });

                    // Prefix each line of child stdout with the package name
                    if (child.stdout) {
                        child.stdout.on("data", chunk => {
                            log(pkg.name, chunk);
                        });
                    }

                    // Prefix each line of child stderr with the package name
                    if (child.stderr) {
                        child.stderr.on("data", chunk => {
                            log(pkg.name, chunk, "error");
                        });
                    }

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
                })
            );
        }

        await Promise.all(tasksList);
    }
}

const createLog = packageName => {
    const prefix = chalk.hex(getRandomColorForString(packageName))(packageName) + ": ";
    return (message, type) => {
        let send = prefix + message;

        if (type) {
            if (type === "error") {
                send = context.error.hl(send);
            }
            if (type === "warn") {
                send = context.warning.hl(send);
            }
        }

        console.log(send);
    };
};

module.exports = { MultiplePackagesWatcher };

