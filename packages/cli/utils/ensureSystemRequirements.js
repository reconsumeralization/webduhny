const chalk = require("chalk");
const { SystemRequirements } = require("@webiny/system-requirements");

const ensureSystemRequirements = () => {
    // Just in case, we want to allow users to skip the system requirements check.
    const skipSystemRequirementsCheck = process.argv.includes("--no-system-requirements-check");
    if (skipSystemRequirementsCheck) {
        return;
    }

    const systemRequirements = SystemRequirements.validate();

    // Check Node.js version.
    if (!systemRequirements.node.valid) {
        console.error(
            chalk.red(
                [
                    `You are running Node.js ${systemRequirements.node.currentVersion}, but Webiny requires version ${systemRequirements.node.requiredVersion}.`,
                    `Please switch to one of the required versions and try again.`,
                    "Learn more: https://www.webiny.com/docs/get-started/install-webiny#prerequisites."
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
};

module.exports = { ensureSystemRequirements };
