const readJson = require("read-json-sync");
const findUp = require("find-up");

class PackageJson {
    static async fromFile(filePath) {
        return new PackageJson(filePath, readJson(filePath));
    }

    static async findClosest(fromPath) {
        const closestPackageJson = await findUp("package.json", { cwd: fromPath });
        return PackageJson.fromFile(closestPackageJson);
    }

    constructor(filePath, json) {
        this.filePath = filePath;
        this.json = json;
    }

    getLocation() {
        return this.filePath;
    }

    getJson() {
        return this.json;
    }
}

module.exports = { PackageJson };
