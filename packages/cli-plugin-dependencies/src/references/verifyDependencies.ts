import { IDependencyTree } from "~/types";
import loadJsonFile from "load-json-file";
import { getDuplicatesFilePath, getReferencesFilePath } from "~/references/files";
import fs from "fs";
import { green } from "chalk";

export interface IVerifyDependenciesParams {
    tree: IDependencyTree;
    dirname: string;
    allowedDuplicates: string[];
}

export const verifyDependencies = (params: IVerifyDependenciesParams): void => {
    const { tree, dirname, allowedDuplicates } = params;

    const referencesFile = getReferencesFilePath({
        dirname
    });
    const duplicatesFile = getDuplicatesFilePath({
        dirname
    });

    const references = {
        dependencies: tree.dependencies,
        devDependencies: tree.devDependencies,
        peerDependencies: tree.peerDependencies,
        resolutions: tree.resolutions,
        references: tree.references
    };

    console.log("Checking references file...");

    if (fs.existsSync(referencesFile)) {
        const json = loadJsonFile.sync(referencesFile);
        if (JSON.stringify(references) !== JSON.stringify(json)) {
            throw new Error(
                "References are not in sync. Please run `yarn webiny sync-dependencies` command."
            );
        }
    } else {
        throw new Error(
            "References file does not exist. Please run `yarn webiny sync-dependencies` command."
        );
    }

    console.log("Checking duplicates file...");

    if (fs.existsSync(duplicatesFile)) {
        const json = loadJsonFile.sync(duplicatesFile);
        if (JSON.stringify(tree.duplicates) !== JSON.stringify(json)) {
            throw new Error(
                "Duplicates are not in sync. Please run `yarn webiny sync-dependencies` command."
            );
        }
        for (const duplicate of tree.duplicates) {
            if (allowedDuplicates.includes(duplicate.name)) {
                continue;
            }
            throw new Error(
                `Duplicate package "${duplicate.name}" found, but it is not in the allowed duplicates list. Please add it to the allowed duplicates list or fix the reason for it being a duplicate.`
            );
        }
    } else {
        throw new Error(
            "Duplicates file does not exist. Please run `yarn webiny sync-dependencies` command."
        );
    }

    console.log(green("✅  All package reference files are in sync."));
};
