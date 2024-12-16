const { SystemRequirements } = require("@webiny/system-requirements");

const SKIP_CHECKS_MESSAGE =
    "If you think this is a mistake, you can also try skipping the system requirements checks by appending the --no-system-requirements-check flag.";

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
            [
                `You are running Node.js %s, but Webiny requires version %s. Please set the required version and try again.`,
                SKIP_CHECKS_MESSAGE
            ].join("\n\n"),
            systemRequirements.node.currentVersion,
            systemRequirements.node.requiredVersion
        );
        process.exit(1);
    }

    // Check NPM version.
    if (!systemRequirements.npm.valid) {
        console.error(
            [
                `Webiny requires NPM %s, but you are using version %s. Please set the required version and try again.`,
                SKIP_CHECKS_MESSAGE
            ].join("\n\n"),
            systemRequirements.npm.requiredVersion,
            systemRequirements.npm.currentVersion
        );
        process.exit(1);
    }

    // Check Yarn version.
    if (!systemRequirements.yarn.valid) {
        console.error(
            [
                `Webiny requires Yarn %s, but you are using version %s. Please set the required version and try again.`,
                SKIP_CHECKS_MESSAGE
            ].join("\n\n"),
            systemRequirements.yarn.requiredVersion,
            systemRequirements.yarn.currentVersion
        );
        process.exit(1);
    }
};

module.exports = { ensureSystemRequirements };
