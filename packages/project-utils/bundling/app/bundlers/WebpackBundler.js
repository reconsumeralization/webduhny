const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const FileSizeReporter = require("react-dev-utils/FileSizeReporter");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const { checkBrowsers } = require("react-dev-utils/browsersHelper");
const printBuildError = require("react-dev-utils/printBuildError");
const webpack = require("webpack");
const { BaseAppBundler } = require("./BaseAppBundler");
const { createWebpackConfig } = require("./webpack/createWebpackConfig");

class WebpackBundler extends BaseAppBundler {
    constructor(params) {
        super();
        this.params = params;
    }

    async build() {
        const log = console.log;

        // Makes the script crash on unhandled rejections instead of silently
        // ignoring them. In the future, promise rejections that are not handled will
        // terminate the Node.js process with a non-zero exit code.
        process.on("unhandledRejection", err => {
            throw err;
        });

        const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
        const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

        // These sizes are pretty large. We'll warn for bundles exceeding them.
        const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
        const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

        const isInteractive = process.stdout.isTTY;

        process.env.NODE_ENV = "production";

        const { cwd, overrides } = this.params;

        const appIndexJs = overrides.entry || path.resolve(cwd, "src", "index.tsx");

        const paths = require("./webpack/config/paths")({ appIndexJs, cwd });

        // First, read the current file sizes in build directory.
        // This lets us display how much they changed later.
        const existingFileSizes = await measureFileSizesBeforeBuild(paths.appBuild);

        if (overrides.output) {
            paths.appBuild = path.resolve(overrides.output);
        }

        // Warn and crash if required files are missing
        if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
            process.exit(1);
        }

        // We require that you explicitly set browsers and do not fall back to browsers list defaults.
        await checkBrowsers(paths.appPath, isInteractive);

        const config = await createWebpackConfig(paths, {
            ...this.params,
            production: true
        });

        // Start the webpack build
        try {
            const { stats, previousFileSizes, warnings } = await this.runBuild({
                paths,
                config,
                previousFileSizes: existingFileSizes,
                options: this.params,
                log
            });

            if (warnings.length) {
                log(chalk.yellow("Compiled with warnings.\n"));
                log(warnings.join("\n\n"));
                log(
                    "\nSearch for the " +
                        chalk.underline(chalk.yellow("keywords")) +
                        " to learn more about each warning."
                );
                log(
                    "To ignore, add " +
                        chalk.cyan("// eslint-disable-next-line") +
                        " to the line before.\n"
                );
            } else {
                log(chalk.green("Compiled successfully.\n"));
            }

            log("File sizes after gzip:\n");
            printFileSizesAfterBuild(
                stats,
                previousFileSizes,
                paths.appBuild,
                WARN_AFTER_BUNDLE_GZIP_SIZE,
                WARN_AFTER_CHUNK_GZIP_SIZE
            );
            log();
        } catch (err) {
            const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === "true";
            if (tscCompileOnError) {
                log(
                    chalk.yellow(
                        "Compiled with the following type errors (you may want to check these before deploying your app):\n"
                    )
                );
                printBuildError(err);
            } else {
                log(chalk.red("Failed to compile.\n"));
                printBuildError(err);
            }

            throw err;
        }
    }

    watch() {
        if (!("REACT_APP_DEBUG" in process.env)) {
            process.env.REACT_APP_DEBUG = "true";
        }

        process.env.NODE_ENV = "development";
        process.env.ESLINT_NO_UNUSED_VARS = "0";

        return require("./webpack/createWatchConfig")(this.params);
    }

    // Create the production build and print the deployment instructions.
    runBuild({ paths, config, previousFileSizes, log }) {
        // Remove all content but keep the directory so that
        // if you're in it, you don't end up in Trash
        fs.emptyDirSync(paths.appBuild);

        // Merge with the public folder
        copyPublicFolder(paths);

        const compiler = webpack(config);

        return new Promise((resolve, reject) => {
            compiler.run((err, stats) => {
                let messages;
                if (err) {
                    if (!err.message) {
                        return reject(err);
                    }

                    let errMessage = err.message;

                    // Add additional information for postcss errors
                    if (Object.prototype.hasOwnProperty.call(err, "postcssNode")) {
                        errMessage +=
                            "\nCompileError: Begins at CSS selector " + err["postcssNode"].selector;
                    }

                    messages = formatWebpackMessages({
                        errors: [errMessage],
                        warnings: []
                    });
                } else {
                    messages = formatWebpackMessages(
                        stats.toJson({
                            all: false,
                            warnings: true,
                            errors: true
                        })
                    );
                }
                if (Array.isArray(messages.errors) && messages.errors.length) {
                    // Only keep the first error. Others are often indicative
                    // of the same problem, but confuse the reader with noise.
                    if (messages.errors.length > 1) {
                        messages.errors.length = 1;
                    }
                    return reject(new Error(messages.errors.join("\n\n")));
                }
                if (
                    process.env.CI &&
                    (typeof process.env.CI !== "string" ||
                        process.env.CI.toLowerCase() !== "false") &&
                    messages.warnings.length
                ) {
                    log(
                        chalk.yellow(
                            "\nTreating warnings as errors because process.env.CI = true.\n" +
                                "Most CI servers set it automatically.\n"
                        )
                    );
                    return reject(new Error(messages.warnings.join("\n\n")));
                }

                return resolve({
                    stats,
                    previousFileSizes,
                    warnings: messages.warnings
                });
            });
        });
    }
}

function copyPublicFolder(paths) {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtml
    });
}

module.exports = { WebpackBundler };
