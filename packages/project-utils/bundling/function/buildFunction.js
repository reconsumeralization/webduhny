const { RspackBundler } = require("./bundlers/RspackBundler");
const { WebpackBundler } = require("./bundlers/WebpackBundler");

module.exports = async params => {
    const { featureFlags } = require("@webiny/feature-flags");
    const bundler = featureFlags.rspack ? new RspackBundler(params) : new WebpackBundler(params);

    return bundler.build();
};
