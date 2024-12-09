import path from "path";
import { CliContext } from "@webiny/cli/types";
import { IDependencyTree } from "~/types";
import { ListAllPackages } from "~/references/ListAllPackages";
import { ListAllPackageJsonFiles } from "./ListAllPackageJsonFiles";
import { ListAllDependencies } from "./ListAllDependencies";

export interface IListAllReferencesParams {
    context: CliContext;
    dirname: string;
}

export const listAllReferences = async (
    params: IListAllReferencesParams
): Promise<IDependencyTree> => {
    const { context } = params;
    const target = path.join(context.project.root, "packages");

    const listAllPackages = new ListAllPackages();
    const listAllPackageJsonFiles = new ListAllPackageJsonFiles();
    const listAllDependencies = new ListAllDependencies();

    const allPackages = await listAllPackages.list(target);

    const allPackageJsonFiles = await listAllPackageJsonFiles.list(allPackages);

    return await listAllDependencies.list({
        basePath: context.project.root,
        files: allPackageJsonFiles,
        ignore: /^@webiny\//
    });
};
