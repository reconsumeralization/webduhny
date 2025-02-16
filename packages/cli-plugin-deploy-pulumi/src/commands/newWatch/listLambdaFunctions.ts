import { getStackExport } from "~/utils";
import path from "path";
import minimatch from "minimatch";

export interface IListLambdaFunctionsParams {
    folder: string;
    env: string;
    variant?: string;
    whitelist?: string | string[];
}

export const listLambdaFunctions = ({
    folder,
    env,
    variant,
    whitelist
}: IListLambdaFunctionsParams) => {
    const stackExport = getStackExport({ folder, env, variant });
    if (!stackExport) {
        // If no stack export is found, return an empty array. This is a valid scenario.
        // For example, watching the Admin app locally, but not deploying it.
        return [];
    }

    const functionsList = stackExport.deployment.resources
        .filter(r => r.type === "aws:lambda/function:Function")
        // This filter ensures that Lambda@Edge functions are excluded.
        .filter(lambdaFunctionResource => {
            return "." in lambdaFunctionResource.outputs.code.assets;
        })
        .map(lambdaFunctionResource => {
            const fnName = lambdaFunctionResource.outputs.name;
            const handlerBuildFolderPath = lambdaFunctionResource.outputs.code.assets["."].path;
            const handlerPath = path.join(handlerBuildFolderPath, "handler.js");
            return {
                name: fnName,
                path: handlerPath
            };
        });

    if (!whitelist) {
        return functionsList;
    }

    const functionNamesToMatch = Array.isArray(whitelist) ? whitelist : [whitelist];

    // `functionNamesToWatch` is an array of glob patterns, which denote which functions to watch.
    return functionsList.filter(fn => {
        return functionNamesToMatch.some(pattern => {
            if (pattern.includes("*")) {
                return minimatch(fn.name, pattern);
            }

            return fn.name.includes(pattern);
        });
    });
};
