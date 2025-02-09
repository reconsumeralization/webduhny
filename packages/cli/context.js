const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const {
    initializeProject,
    importModule,
    PluginsContainer,
    log,
    localStorage,
    noop
} = require("./utils/index.js");

class Context {
    loadedEnvFiles = {};

    constructor(project, localStorage) {
        this.project = project;

        // Check if `projectName` was injected properly.
        if (this.project.name === "[PROJECT_NAME]") {
            console.log(
                [
                    "",
                    "🚨 IMPORTANT 🚨",
                    "Looks like your project was not bootstrapped correctly! We recommend creating a new project from scratch.",
                    "If you see errors during project creation, please report them to us:",
                    "🔗 Github:\thttps://github.com/webiny/webiny-js",
                    "🔗 Slack:\thttps://www.webiny.com/slack",
                    ""
                ].join("\n")
            );
            process.exit(1);
        }

        this.plugins = new PluginsContainer();
        this.localStorage = localStorage;
        this.onExitCallbacks = [];

        let onExitProcessed = false;
        process.on("SIGINT", async () => {
            if (onExitProcessed) {
                return;
            }

            onExitProcessed = true;

            for (let i = 0; i < this.onExitCallbacks.length; i++) {
                await this.onExitCallbacks[i]("SIGINT");
            }

            process.exit(1);
        });
    }

    onExit(callback) {
        this.onExitCallbacks.push(callback);
    }

    import(name) {
        return importModule(name);
    }

    async loadUserPlugins() {
        if (this.project.config.cli) {
            let plugins = this.project.config.cli.plugins || [];
            if (typeof plugins === "function") {
                plugins = await plugins();
            }

            const resolvedPlugins = await Promise.all(
                plugins.map(async plugin => {
                    if (typeof plugin === "string") {
                        let loadedPlugin;
                        try {
                            // Try loading the package from the project's root
                            // TODO: when migrating to ESM, simply convert this to `await import`.
                            loadedPlugin = require(path.join(this.project.root, plugin));
                        } catch {
                            // If it fails, perhaps the user still has the package installed somewhere locally...
                            // TODO: when migrating to ESM, simply convert this to `await import`.
                            loadedPlugin = require(plugin);
                        }
                        return loadedPlugin;
                    }
                    return plugin;
                })
            );

            this.plugins.register(resolvedPlugins);
        }
    }

    log = log.log;
    info = log.info;
    success = log.success;
    debug = process.argv.some(v => v.match("--debug")) ? log.debug : noop;
    warning = log.warning;
    error = log.error;

    resolve(...dir) {
        return path.resolve(this.project.root, ...dir);
    }

    replaceProjectRoot(path) {
        return path.replace(this.project.root, "<projectRoot>").replace(/\\/g, "/");
    }

    /**
     * Uses `dotenv` lib to load env files, by accepting a simple file path.
     * @param filePath
     * @param debug
     * @returns {Promise<void>}
     */
    async loadEnv(filePath, { debug = false } = {}) {
        if (this.loadedEnvFiles[filePath]) {
            return;
        }

        if (!fs.existsSync(filePath)) {
            debug && this.debug(`No environment file found on %s.`, filePath);
            return;
        }

        try {
            dotenv.config({ path: filePath });
            debug && this.success(`Loaded environment variables from ${filePath}.`);
            this.loadedEnvFiles[filePath] = true;
        } catch (err) {
            if (debug) {
                this.error(`Could not load env variables from ${filePath}:`);
                this.error(err.message);
                console.log();
            }
        }
    }
}

let context;

module.exports.getContext = () => {
    if (!context) {
        throw Error(
            `CLI has not been initialized! Make sure you call "initializeProject" from "@webiny/cli"!`
        );
    }

    return context;
};

module.exports.createContext = async () => {
    if (!context) {
        const project = await initializeProject();
        const localStorageDep = localStorage();

        if (!project) {
            console.log(
                `🚨 Couldn't locate "webiny.project.ts"! Webiny CLI relies on that file to find the root of a Webiny project.`
            );
            process.exit(1);
        }

        context = new Context(project, localStorageDep);
    }

    return context;
};
