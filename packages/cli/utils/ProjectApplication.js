const { dirname, basename, join, relative } = require("path");
const findUp = require("find-up");
const glob = require("fast-glob");
const { importModule } = require("./importModule");
const { PackageJson } = require("./PackageJson");

const appConfigs = ["webiny.application.js", "webiny.application.ts"];

class ProjectApplication {
    static async loadFromDirectory(project, directory) {
        const cwd = directory;

        // Using "Pulumi.yaml" for the backwards compatibility.
        const applicationRootFile = await findUp(appConfigs.concat("Pulumi.yaml"), { cwd });

        if (!applicationRootFile) {
            throw new Error(`Could not detect project application in given directory (${cwd}).`);
        }

        const rootFile = applicationRootFile.replace(/\\/g, "/");
        const projectAppRootPath = dirname(rootFile);

        let applicationConfig;
        if (appConfigs.includes(basename(rootFile))) {
            applicationConfig = importModule(rootFile);
        }

        let id, name, description;
        if (applicationConfig) {
            id = applicationConfig.id;
            name = applicationConfig.name;
            description = applicationConfig.description;
        } else {
            name = basename(projectAppRootPath);
            description = name;
            id = name;
        }

        const projectAppRelativePath = relative(project.root, projectAppRootPath);
        const projectAppWorkspacePath = join(
            project.root,
            ".webiny",
            "workspaces",
            projectAppRelativePath
        );

        return {
            id,
            name,
            description,
            root: projectAppRootPath,
            paths: {
                relative: projectAppRelativePath,
                absolute: projectAppRootPath,
                workspace: projectAppWorkspacePath
            },
            config: applicationConfig,
            project,
            getPackages: async () => {
                const webinyConfigs = await glob(
                    join(projectAppRootPath, "**/webiny.config*.{ts,js}").replace(/\\/g, "/")
                );

                return await Promise.all(
                    webinyConfigs.map(async config => {
                        const dirPath = dirname(config);
                        const packageJson = await PackageJson.findClosest(dirPath);
                        return {
                            name: packageJson.getJson().name,
                            paths: {
                                absolute: dirname(config),
                                relative: relative(project.root, dirPath),
                                root: dirname(config),
                                packageJson: packageJson.getLocation(),
                                config
                            },
                            packageJson: packageJson.getJson()
                        };
                    })
                );
            }
        };
    }
}

module.exports = { ProjectApplication };
