import path from "path";
import { allWorkspaces } from "../../packages/project-utils/workspaces";
import { BasicPackages } from "./BasicPackages";
import { LatestVersionPackages } from "./LatestVersionPackages";
import { ResolutionPackages } from "./ResolutionPackages";
import { UpPackages } from "./UpPackages";
import { IPreset } from "./createPreset";

const getAllPackages = (): string[] => {
    const workspaces = allWorkspaces() as string[];
    const packages = workspaces.map(pkg => {
        return path.resolve(process.cwd(), pkg);
    });

    packages.push(path.resolve(process.cwd()));

    return packages;
};

interface IUpdatePackagesParams {
    presets: IPreset[];
    dryRun: boolean;
    skipResolutions: boolean;
    matching?: RegExp;
    preset?: string;
}

interface IConfigurationParams {
    matching?: RegExp;
    preset?: string;
    skipResolutions?: boolean;
    dryRun?: boolean;
    presets: IPreset[];
}

interface IConfiguration {
    skipResolutions: boolean;
    matching: RegExp;
    dryRun: boolean;
}

const getConfiguration = (params: IConfigurationParams): IConfiguration => {
    if (!params.preset && !params.matching) {
        throw new Error(`Missing both preset and matching parameters.`);
    } else if (params.preset && params.matching) {
        throw new Error(`Cannot have both preset and matching parameters.`);
    } else if (params.matching) {
        return {
            matching: params.matching,
            dryRun: !!params.dryRun,
            skipResolutions: !!params.skipResolutions
        };
    }
    const preset = params.presets.find(p => p.name === params.preset);
    if (!preset) {
        throw new Error(`There is no preset "${params.preset}".`);
    }
    return {
        ...preset,
        dryRun: !!params.dryRun
    };
};

const updatePackages = async (params: IUpdatePackagesParams) => {
    const { matching, skipResolutions, dryRun } = getConfiguration(params);
    /**
     * Basic packages container with all packages that match the regex and their versions in the package.json files.
     */
    const packages = await BasicPackages.create({
        packages: getAllPackages(),
        matching
    });
    /**
     * Versioned packages container.
     * All packages with latest versions
     */
    const latestVersionPackages = await LatestVersionPackages.create({
        packages: packages.packages
    });

    const updatable = latestVersionPackages.getUpdatable();
    if (updatable.length === 0) {
        console.log("All packages are up-to-date. Exiting...");
        return;
    }
    if (dryRun !== false) {
        console.log("Dry run mode enabled. Packages which will get updated:");
        for (const pkg of updatable) {
            console.log(`${pkg.name}: ${pkg.version.raw} -> ${pkg.latestVersion.raw}`);
        }
        return;
    }

    const resolutions = await ResolutionPackages.create({
        skip: skipResolutions,
        path: path.resolve(process.cwd(), "package.json"),
        packages: updatable
    });

    await resolutions.addToPackageJson();

    const updatePackages = await UpPackages.create({
        packages: updatable
    });

    await updatePackages.process();

    await resolutions.removeFromPackageJson();
};

export interface ICreateUpdatePackagesParams {
    presets: IPreset[];
}

export const createUpdatePackages = ({ presets }: ICreateUpdatePackagesParams) => {
    return (params: Omit<IUpdatePackagesParams, "presets">) => {
        return updatePackages({
            ...params,
            presets
        });
    };
};
