import execa from "execa";
import semver from "semver";
import { IBasicPackage, IUpdateablePackage, IVersionedPackage } from "./types";

export interface ILatestVersionPackagesParams {
    packages: IBasicPackage[];
}

export class LatestVersionPackages {
    public readonly packages: IVersionedPackage[];

    public constructor(packages: IVersionedPackage[]) {
        this.packages = packages;
    }

    public getUpdateable(): IUpdateablePackage[] {
        return this.packages
            .filter(pkg => !pkg.isLatest)
            .map(pkg => {
                return {
                    name: pkg.name,
                    version: pkg.version,
                    latestVersion: pkg.latestVersion
                };
            });
    }

    public static async create(params: ILatestVersionPackagesParams) {
        const { packages: localPackages } = params;

        const results: IVersionedPackage[] = [];

        for (const localPackage of localPackages) {
            try {
                const result = await execa("npm", ["show", localPackage.name, "version"]);
                if (!result.stdout) {
                    console.log(`Could not find "${localPackage.name}" latest version on npm.`);
                    continue;
                }
                const npmPackageVersion = semver.coerce(result.stdout);
                if (!npmPackageVersion) {
                    console.log(
                        `Could not coerce "${localPackage.name}" latest version "${result.stdout}" from npm.`
                    );
                    continue;
                }
                if (semver.gte(localPackage.version, npmPackageVersion)) {
                    results.push({
                        ...localPackage,
                        version: localPackage.version,
                        latestVersion: localPackage.version,
                        isLatest: true
                    });
                    continue;
                }

                results.push({
                    ...localPackage,
                    version: localPackage.version,
                    latestVersion: npmPackageVersion,
                    isLatest: false
                });
            } catch (ex) {
                console.error(`Could not find "${localPackage}" latest version on npm.`, ex);
            }
        }
        return new LatestVersionPackages(results);
    }
}
