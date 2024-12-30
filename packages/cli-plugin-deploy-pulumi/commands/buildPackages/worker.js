const workerData = JSON.parse(process.argv[2]);
const { package: pkg, env, debug } = workerData;

require("@webiny/cli/utils/importModule");
const { cli } = require("@webiny/cli");

const options = { cwd: pkg.paths.root, env };

let config = require(pkg.paths.config).default || require(pkg.paths.config);
if (typeof config === "function") {
    config = config({ options, context: cli });
}

const hasBuildCommand = config.commands && typeof config.commands.build === "function";
if (!hasBuildCommand) {
    throw new Error("Build command not found.");
}

config.commands.build(options)