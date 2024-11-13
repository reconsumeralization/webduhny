#!/usr/bin/env node
process.env.NODE_PATH = process.cwd();
require("ts-node").register({
    dir: __dirname
});

const { presets } = require("./presets");
const { createUpdatePackages } = require("./updatePackages");

module.exports = {
    updatePackages: createUpdatePackages({
        presets
    })
};
