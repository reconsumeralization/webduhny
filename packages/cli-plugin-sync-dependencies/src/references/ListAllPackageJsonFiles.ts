import glob from "glob";

export class ListAllPackageJsonFiles {
    public async list(targets: string[]): Promise<string[]> {
        const results: string[] = [];

        for (const target of targets) {
            const files = glob.sync(`${target}/**/**/package.json`, {
                ignore: ["**/node_modules/**", "**/dist/**"]
            });
            results.push(...files);
        }

        return results;
    }
}
