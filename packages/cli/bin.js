#!/usr/bin/env node
(() => {
    // Suppress punycode warnings. This is a known issue which we can't fix.
    require("./utils/suppressPunycodeWarnings");

    // Ensure system requirements are met.
    const { ensureSystemRequirements } = require("@webiny/system-requirements");
    ensureSystemRequirements();

    // Run the actual CLI.
    require("./cli.js");
})();
