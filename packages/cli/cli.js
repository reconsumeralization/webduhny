const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

// Disable help processing until after plugins are imported.
const { createCommands } = require("./commands/index.js");

const { blue, red, bold, bgYellow } = require("chalk");
const { loadEnvVariables } = require("./utils/loadEnvVariables");
const { createContext } = require("./context");

const onFail = context => (msg, error, yargs) => {
    if (msg) {
        if (msg.includes("Not enough non-option arguments")) {
            console.log();
            context.error(red("Command was not invoked as expected!"));
            context.info(
                `Some non-optional arguments are missing. See the usage examples printed below.`
            );
            console.log();
            yargs.showHelp();
            return;
        }

        if (msg.includes("Missing required argument")) {
            const args = msg
                .split(":")[1]
                .split(",")
                .map(v => v.trim());

            console.log();
            context.error(red("Command was not invoked as expected!"));
            context.info(
                `Missing required argument(s): ${args
                    .map(arg => red(arg))
                    .join(", ")}. See the usage examples printed below.`
            );
            console.log();
            yargs.showHelp();
            return;
        }
        console.log();
        context.error(red("Command execution was aborted!"));
        context.error(msg);
        console.log(error);

        process.exit(1);
    }

    console.log();
    // Unfortunately, yargs doesn't provide passed args here, so we had to do it via process.argv.
    const debugEnabled = process.argv.includes("--debug");
    if (debugEnabled) {
        context.debug(error);
    } else {
        context.error(error.message);
    }

    const gracefulError = error.cause?.gracefulError;
    if (gracefulError instanceof Error) {
        console.log();
        console.log(bgYellow(bold("💡 How can I resolve this?")));
        console.log(gracefulError.message);
    }

    const plugins = context.plugins.byType("cli-command-error");
    for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        plugin.handle({
            error,
            context
        });
    }

    process.exit(1);
};

(async () => {
    // Loads environment variables from multiple sources.
    const context = await createContext();

    // Once the project context is loaded, load ENV variables.
    await loadEnvVariables();

    const builder = yargs(hideBin(process.argv))
        .usage("Usage: $0 <command> [options]")
        .help(false)
        .demandCommand(1)
        .recommendCommands()
        .scriptName("webiny")
        .epilogue(
            `To find more information, docs and tutorials, see ${blue(
                "https://www.webiny.com/docs"
            )}.`
        )
        .epilogue(`Want to contribute? ${blue("https://github.com/webiny/webiny-js")}.`)
        .fail(onFail(context));

    await createCommands(builder, context);

    // Enable help and run the CLI.
    builder.help(true).argv;
})();
