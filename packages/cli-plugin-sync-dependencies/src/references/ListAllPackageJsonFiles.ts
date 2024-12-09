import glob from "glob";

export class ListAllPackageJsonFiles {
    public async list(targets: string[]): Promise<string[]> {
        const results: string[] = [];

        for (const target of targets) {
            const files = glob.sync(`${target}/**/**/package.json`, {
                ignore: ["**/node_modules/**", "**/dist/**"]
            });
            results.push(...files);
            /**
             * Some of our packages have files named `dependencies.json` which contain a list of dependencies.
             */
            const dependencies = glob.sync(`${target}/**/**/dependencies.json`, {
                ignore: ["**/node_modules/**", "**/dist/**"]
            });
            results.push(...dependencies);
        }

        return results;
    }
}
