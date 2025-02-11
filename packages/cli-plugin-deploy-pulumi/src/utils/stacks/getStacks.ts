import path from "path";
import fs from "fs";
import glob from "fast-glob";
import { getProject } from "@webiny/cli/utils";
import { splitStackName } from "~/utils";
import { createStack } from "./Stack";
import type { IStack } from "./Stack";

export interface IGetStacksParams {
    folder: string;
    env: string;
    cwd?: string;
}

export interface IGetStacksResult {
    app: string;
    env: string;
    folder: string;
    stacks: IStack[];
}

export const getStacks = (params: IGetStacksParams): IGetStacksResult => {
    const project = getProject();
    const { folder, env, cwd } = params;

    const app = folder.split("/").pop();
    if (!app) {
        throw new Error(`Invalid folder: ${folder}`);
    }

    const target = path.join(cwd || project.root, ".pulumi", folder, ".pulumi", "stacks", app);

    if (!fs.existsSync(target)) {
        throw new Error(`Folder does not exist: ${target}`);
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
        throw new Error(`No matching stacks found with "${match}".`);
    }
    return {
        app,
        env,
        folder,
        stacks
    };
};
