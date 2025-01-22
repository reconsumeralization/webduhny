const { login } = require("../../utils");

module.exports = async ({ inputs, projectApplication, pulumi }) => {
    const { env, variant } = inputs;

    await login(projectApplication);

    console.log("------> stack", {
        env,
        variant
    });

    const PULUMI_SECRETS_PROVIDER = process.env.PULUMI_SECRETS_PROVIDER;
    const PULUMI_CONFIG_PASSPHRASE = process.env.PULUMI_CONFIG_PASSPHRASE;
    /**
     * We want to have stack name as env-variant.
     * If there is no variant sent, just env will be used - this is to maintain backward compatibility.
     */
    const stackName = [env, variant].filter(Boolean).join("-");

    console.log("------> run command", ["stack", "select", stackName].join(" "));

    await pulumi.run({
        command: ["stack", "select", stackName],
        args: {
            create: true,
            secretsProvider: PULUMI_SECRETS_PROVIDER
        },
        execa: {
            env: {
                PULUMI_CONFIG_PASSPHRASE
            }
        }
    });

    const result = await pulumi.run({
        command: ["stack", "output"],
        execa: {
            env: {
                PULUMI_CONFIG_PASSPHRASE
            }
        }
    });

    console.log(JSON.stringify(result));
};
