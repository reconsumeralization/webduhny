import { PackageJson as BasePackageJson } from "type-fest";
import { SemVer } from "semver";

export interface IBasicPackage {
    name: string;
    version: SemVer;
}

export interface IVersionedPackage extends IBasicPackage {
    latestVersion: SemVer;
    isLatest: boolean;
}

export type IUpdateablePackage = Omit<IVersionedPackage, "isLatest">;

// export interface IPackageCollectionItem {
//     name: string;
//     version: SemVer | null;
//     latest: SemVer | null;
//     updateToLatest?: boolean;
// }
// export interface IPackageCollection {
//     [name: string]: IPackageCollectionItem;
// }

export interface IPackageJson extends BasePackageJson {
    resolutions: Record<string, string>;
}
