const { getProjectApplication } = require("@webiny/cli/utils");

module.exports = async options => {
    if (!options) {
        options = {};
    }
    if (!options.cwd) {
        options.cwd = process.cwd();
    }
    const webpack = require("webpack");

    const { overrides, cwd } = options;

    let projectApplication;
    try {
        projectApplication = getProjectApplication({ cwd });
    } catch {
        // No need to do anything.
    }

    // Load base webpack config
    let webpackConfig = require("./webpack.config")({
        production: false,
        projectApplication,
        ...options
    });

    // Customize Webpack config.
    if (typeof overrides.webpack === "function") {
        webpackConfig = overrides.webpack(webpackConfig);
    }

    let initialCompilation = true;
    return new Promise(async (resolve, reject) => {
        if (options.logs) {
            if (initialCompilation) {
                console.log("Initial compilation started...");
            } else {
                console.log("Compiling...");
            }
        }

        return webpack(webpackConfig).watch({}, async (err, stats) => {
            if (err) {
                return reject(err);
            }

            if (!stats.hasErrors()) {
                if (initialCompilation) {
                    initialCompilation = false;
                    console.log("Initial compilation completed. Watching for changes...");
                } else {
                    options.logs && console.log("Compiled successfully.");
                }
            } else {
                options.logs && console.log(stats.toString("errors-warnings"));
            }
        });
    });
};
