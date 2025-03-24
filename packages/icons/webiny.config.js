const rimraf = require("rimraf");
const { join } = require("path");
const fs = require("fs");
const path = require("path");

module.exports = {
    commands: {
        build: async () => {
            rimraf.sync(join(__dirname, "./dist"));
            const destDir = path.resolve(__dirname, "dist");
            fs.mkdirSync(destDir, { recursive: true });

            copyToDist("package.json");
            copyToDist("LICENSE");
            copyToDist("README.md");

            // Copy all icons from `@material-design-icons/svg/outlined` folder to `dist` folder.
            // We're doing this because simply re-exporting icons from `@material-ui/icons` package
            // was not possible.
            const pkgDirPath = path.dirname(
                require.resolve("@material-design-icons/svg/package.json")
            );
            const outlinedIconsDirPath = path.resolve(pkgDirPath, "outlined");

            fs.readdirSync(outlinedIconsDirPath).forEach(file => {
                const sourceFile = path.join(outlinedIconsDirPath, file);
                const destFile = path.join(destDir, file);
                fs.copyFileSync(sourceFile, destFile);
            });
        }
    }
};

const copyToDist = path => {
    const from = join(__dirname, path);
    const to = join(__dirname, "dist", path);
    fs.copyFileSync(from, to);
};
