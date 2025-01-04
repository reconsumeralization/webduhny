const workerData = JSON.parse(process.argv[2]);
const { package: pkg, env, debug } = workerData;
const { serializeError } = require("serialize-error");

require("@webiny/cli/utils/importModule");
const { cli } = require("@webiny/cli");

const options = { cwd: pkg.paths.root, env, debug };

let config = require(pkg.paths.config).default || require(pkg.paths.config);
if (typeof config === "function") {
    config = config({ options, context: cli });
}

const hasWatchCommand = config.commands && typeof config.commands.watch === "function";
if (!hasWatchCommand) {
    console.log(
        `Skipping watch; ${cli.warning.hl(
            "watch"
        )} command is missing. Check package's ${cli.warning.hl("webiny.config.ts")} file.`
    );
    return;
}

config.commands.watch(options).catch(error => {
    // Send error message to the parent process
    process.send(serializeError(error));
    process.exit(1); // Ensure the worker process exits with an error code
});
