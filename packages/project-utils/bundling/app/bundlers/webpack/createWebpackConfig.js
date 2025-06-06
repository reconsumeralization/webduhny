const { applyDefaults } = require("../../utils");

const createWebpackConfig = async (paths, options) => {
    applyDefaults();

    const configFactory = require("./config/webpack.config");

    // Generate configuration
    let config = configFactory("production", { paths, options });

    if (typeof options.overrides.webpack === "function") {
        config = options.overrides.webpack(config);
    }

    return config;
};

module.exports = { createWebpackConfig };
