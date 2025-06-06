const chalk = require("react-dev-utils/chalk");
const { choosePort, prepareUrls } = require("react-dev-utils/WebpackDevServerUtils");
const clearConsole = require("react-dev-utils/clearConsole");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");

module.exports = class RspackDevServer {
    constructor(compiler, options = {}) {
        this.isInteractive = process.stdout.isTTY;
        this.compiler = compiler;
        this.options = options;
    }

    async start() {
        const createDevServerConfig = require("./config/devServer.config");

        const host = this.getHost();
        const port = await this.getPort(host);
        const https = process.env.HTTPS === "true";
        const protocol = https ? "https" : "http";
        const urls = prepareUrls(protocol, host, port);

        this.hookIntoCompiler({ urls });

        const devServerConfig = createDevServerConfig({
            host,
            port,
            https,
            allowedHost: urls.lanUrlForConfig,
            paths: this.options.paths
        });

        const { RspackDevServer } = require("@rspack/dev-server");

        console.log(chalk.cyan("Starting the development server...\n"));

        const server = new RspackDevServer(devServerConfig, this.compiler);

        await server.start();
    }

    getHost() {
        const host = process.env.HOST || "0.0.0.0";

        if (process.env.HOST) {
            console.log(
                chalk.cyan(
                    `Attempting to bind to HOST environment variable: ${chalk.yellow(
                        chalk.bold(process.env.HOST)
                    )}`
                )
            );
            console.log(
                `If this was unintentional, check that you haven't mistakenly set it in your shell.`
            );
            console.log(`Learn more here: ${chalk.yellow("https://bit.ly/CRA-advanced-config")}`);
            console.log();
        }

        return host;
    }

    async getPort(host) {
        const defaultPort = parseInt(process.env.PORT, 10) || 3000;

        const port = await choosePort(host, defaultPort);
        if (port == null) {
            // We have not found a port.
            throw new Error(`No free port was found. Default port is ${defaultPort}`);
        }

        return port;
    }

    hookIntoCompiler({ urls }) {
        // "invalid" event fires when you have changed a file, and webpack is
        // recompiling a bundle. WebpackDevServer takes care to pause serving the
        // bundle, so if you refresh, it'll wait instead of serving the old one.
        // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
        this.compiler.hooks.invalid.tap("invalid", () => {
            if (this.isInteractive) {
                clearConsole();
            }
            console.log("Compiling...");
        });

        let isFirstCompile = true;

        // "done" event fires when webpack has finished recompiling the bundle.
        // Whether or not you have warnings or errors, you will get this event.
        this.compiler.hooks.done.tap("done", async stats => {
            if (this.isInteractive) {
                clearConsole();
            }

            const statsData = stats.toJson({
                all: false,
                warnings: true,
                errors: true
            });

            const messages = formatWebpackMessages(statsData);
            const isSuccessful = !messages.errors.length && !messages.warnings.length;
            if (isSuccessful) {
                console.log(chalk.green("Compiled successfully!"));
            }
            if (isSuccessful && (this.isInteractive || isFirstCompile)) {
                this.printInstructions(this.getAppName(), urls);
            }
            isFirstCompile = false;

            // If errors exist, only show errors.
            if (messages.errors.length) {
                // Only keep the first error message.
                if (messages.errors.length > 1) {
                    messages.errors.length = 1;
                }
                console.log(chalk.red("Failed to compile.\n"));
                console.log(messages.errors.join("\n\n"));
                return;
            }

            // Show warnings if no errors were found.
            if (messages.warnings.length) {
                console.log(chalk.yellow("Compiled with warnings.\n"));
                console.log(messages.warnings.join("\n\n"));

                // Teach some ESLint tricks.
                console.log(
                    "\nSearch for the " +
                        chalk.underline(chalk.yellow("keywords")) +
                        " to learn more about each warning."
                );
                console.log(
                    "To ignore, add " +
                        chalk.cyan("// eslint-disable-next-line") +
                        " to the line before.\n"
                );
            }
        });
    }

    getAppName() {
        return require(this.options.paths.appPackageJson).name;
    }

    printInstructions(appName, urls) {
        console.log();
        console.log(`You can now view ${chalk.bold(appName)} in the browser.`);
        console.log();

        console.log(`  ${chalk.bold("Local:")}            ${urls.localUrlForTerminal}`);
        console.log(`  ${chalk.bold("On Your Network:")}  ${urls.lanUrlForTerminal}`);

        console.log();
    }
};
