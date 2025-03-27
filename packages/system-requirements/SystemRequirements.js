const semver = require("semver");
const execa = require("execa");
const constraints = require("./constraints.json");

class SystemRequirements {
    static validate() {
        const nodeVersion = SystemRequirements.getNodeVersion();
        const yarnVersion = SystemRequirements.getYarnVersion();
        const npmVersion = SystemRequirements.getNpmVersion();
        const npxVersion = SystemRequirements.getNpxVersion();

        const systemRequirements = {
            valid: false,
            node: {
                currentVersion: nodeVersion,
                requiredVersion: constraints.node,
                valid: semver.satisfies(nodeVersion, constraints.node)
            },
            npm: {
                currentVersion: npmVersion,
                requiredVersion: constraints.npm,
                valid: semver.satisfies(npmVersion, constraints.npm)
            },
            npx: {
                currentVersion: npxVersion,
                requiredVersion: constraints.npx,
                valid: semver.satisfies(npxVersion, constraints.npx)
            },
            yarn: {
                currentVersion: yarnVersion,
                requiredVersion: constraints.yarn,
                valid: semver.satisfies(yarnVersion, constraints.yarn)
            }
        };

        systemRequirements.valid =
            systemRequirements.node.valid &&
            systemRequirements.npm.valid &&
            systemRequirements.npx.valid &&
            systemRequirements.yarn.valid;

        return systemRequirements;
    }

    static getNodeVersion() {
        return process.versions.node;
    }

    static getNpmVersion() {
        const { stdout } = execa.sync("npm", ["--version"]);
        return stdout;
    }

    static getNpxVersion() {
        const { stdout } = execa.sync("npx", ["--version"]);
        return stdout;
    }

    static getYarnVersion() {
        const { stdout } = execa.sync("yarn", ["--version"]);
        return stdout;
    }
}

module.exports = { SystemRequirements };
