const { applyDefaults } = require("../../utils");

const createRspackConfig = (paths, options) => {
    applyDefaults();

    const configFactory = require("./config/rspack.config");

    // Generate configuration
    let config = configFactory(options.env, { paths, options });

    if (typeof options.overrides.rspack === "function") {
        config = options.overrides.rspack(config);
    }

    return config;
};

module.exports = { createRspackConfig };
