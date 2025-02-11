import path from "path";
import fs from "fs";
import glob from "fast-glob";
import { getProject } from "@webiny/cli/utils";
import { GracefulError, splitStackName } from "~/utils";
import type { IStack } from "./Stack";
import { createStack } from "./Stack";

export interface IGetStacksParams {
    applications: string[];
    env: string;
    cwd?: string;
}

export interface IApplicationStacks {
    app: string;
    env: string;
    folder: string;
    stacks: IStack[];
}

export const getApplicationsStacks = (params: IGetStacksParams): IApplicationStacks[] => {
    const project = getProject();
    const { applications, env, cwd } = params;

    return applications.map(folder => {
        const app = folder.split("/").pop();
        if (!app) {
            throw new GracefulError(`Cannot determine application name from folder: ${folder}`);
        }

        const target = path.join(cwd || project.root, ".pulumi", folder, ".pulumi", "stacks", app);

        if (!fs.existsSync(target)) {
            throw new GracefulError(
                `Stacks folder "${target}" does not exist. Did you deploy the "${app}" application?`
            );
        }

        const match = `${target}/${env}*.json`;

        const stacks = glob
            .sync(match, {})
            .map(file => {
                const parts = file.replace(".json", "").split("/");
                const part = parts.pop();
                if (!part) {
                    return null;
                }
                const { env, variant } = splitStackName(part);

                return createStack({
                    env,
                    variant
                });
            })
            .filter((item): item is IStack => !!item);

        if (!stacks.length) {
            throw new GracefulError(`There are no stacks in "${target}" for environment "${env}".`);
        }
        return {
            app,
            env,
            folder,
            stacks
        };
    });
};
