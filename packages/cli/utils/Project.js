const { join, dirname } = require("path");
const glob = require("fast-glob");
const findUp = require("find-up");
const { importModule } = require("./importModule");
const { PackageJson } = require("./PackageJson");
const { ProjectApplication } = require("./ProjectApplication");

const projectConfigs = ["webiny.project.js", "webiny.project.ts"];

async function getRoot() {
    let root = await findUp(projectConfigs);
    if (root) {
        return dirname(root).replace(/\\/g, "/");
    }

    // For backwards compatibility
    root = await findUp("webiny.root.js");
    if (root) {
        return dirname(root).replace(/\\/g, "/");
    }

    throw new Error("Couldn't detect Webiny project.");
}

async function getConfig() {
    let path = await findUp(projectConfigs);
    if (path) {
        return importModule(path);
    }

    path = await findUp("webiny.root.js");
    if (path) {
        return require(path);
    }

    throw new Error("Couldn't detect Webiny project.");
}

class Project {
    root;
    config;
    version;
    applications;

    constructor(root, config) {
        this.root = root;
        this.config = config;
    }

    get name() {
        return process.env.WEBINY_PROJECT_NAME || this.config.projectName || this.config.name;
    }

    get config() {
        return this.config;
    }

    get root() {
        return this.root;
    }

    getApplication(applicationRoot) {
        return this.applications[applicationRoot];
    }

    /**
     * @private
     * @internal
     */
    async init() {
        // Read `@webiny/cli` package version.
        const packageJson = await PackageJson.findClosest(__dirname);
        this.version = packageJson.getJson().version;

        // Identify project applications.
        const projectApplications = await glob(
            join(this.root, "apps/**/webiny.application*.{ts,js}").replace(/\\/g, "/"),
            { onlyFiles: true, ignore: ["**/node_modules/**"] }
        );

        this.applications = await projectApplications.reduce((acc, appRoot) => {
            return acc.then(async acc => {
                const projectApplication = await ProjectApplication.loadFromDirectory(
                    this,
                    appRoot
                );
                try {
                    return {
                        ...acc,
                        [projectApplication.root]: projectApplication
                    };
                } catch (error) {
                    // Usually, this error will happen in webiny-js repository, when building repo packages.
                    // It is ok to ignore this error, because it is only related to package building, not actual project runtime.
                    return { ...acc };
                }
            });
        }, Promise.resolve({}));
    }

    static async load() {
        const root = await getRoot();
        const config = await getConfig();

        const project = new Project(root, config);
        await project.init();
        return project;
    }
}

module.exports = { Project };
