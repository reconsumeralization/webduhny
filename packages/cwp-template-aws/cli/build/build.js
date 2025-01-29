const { green } = require("chalk");
const { getPulumi } = require("@webiny/cli-plugin-deploy-pulumi/utils");
const execa = require("execa");

const build = (app, env, inputs) => {
    return execa("yarn", ["webiny", "build", app, "--env", env, "--debug", Boolean(inputs.debug)], {
        stdio: "inherit"
    });
};

module.exports = async (inputs, context) => {
    const { env } = inputs;

    // Ensure Pulumi is installed.
    const pulumi = await getPulumi({ install: false });

    pulumi.install();

    context.info(`Building ${green("Core")} project application...`);
    await build("apps/core", env, inputs);

    console.log();
    context.info(`Building ${green("API")} project application...`);
    await build("apps/api", env, inputs);

    console.log();
    context.info(`Building ${green("Admin")} project application...`);
    await build("apps/admin", env, inputs);

    console.log();
    context.info(`Building ${green("Website")} project application...`);
    await build("apps/website", env, inputs);
};
