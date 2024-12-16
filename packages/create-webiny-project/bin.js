#!/usr/bin/env node
"use strict";

const chalk = require("chalk");
const verifyConfig = require("./utils/verifyConfig");
const { SystemRequirements } = require("@webiny/system-requirements");

(async () => {
    const systemRequirements = SystemRequirements.validate();

    if (systemRequirements.valid) {
        // Verify `.webiny` config file and continue.
        await verifyConfig();

        require("./index");
    }

    // Check Node.js version.
    if (!systemRequirements.node.valid) {
        console.error(
            chalk.red(
                [
                    `You are running Node.js ${systemRequirements.node.currentVersion}, but Webiny requires version ${systemRequirements.node.requiredVersion}.`,
                    `Please switch to one of the required versions and try again.`,
                    "For more information, please visit https://www.webiny.com/docs/get-started/install-webiny#prerequisites."
                ].join(" ")
            )
        );
        process.exit(1);
    }

    // Check NPM version.
    if (!systemRequirements.npm.valid) {
        console.error(
            chalk.red(
                [
                    `Webiny requires npm@^${systemRequirements.npm.requiredVersion}.`,
                    `Please run ${chalk.green(
                        "npm install npm@latest -g"
                    )}, to get the latest version.`
                ].join("\n")
            )
        );
        process.exit(1);
    }

    // Check Yarn version.
    if (!systemRequirements.yarn.valid) {
        console.error(
            chalk.red(
                [
                    `Webiny requires yarn@^${systemRequirements.yarn.requiredVersion}.`,
                    `Please visit https://yarnpkg.com/ to install ${chalk.green("yarn")}.`
                ].join("\n")
            )
        );
        process.exit(1);
    }
})();
