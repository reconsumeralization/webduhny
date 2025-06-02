module.exports = config => async options => {
    const { prepareOptions } = require("../../utils");
    const { applyDefaults } = require("./utils");
    const { AppBundler } = require("./bundlers/AppBundler");

    applyDefaults();
    const preparedOptions = prepareOptions({ config, options });
    const bundler = new AppBundler(preparedOptions);

    return bundler.build();
};
