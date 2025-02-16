import { IUserCommandInput } from "~/types";
import execa from "execa";
import { getProject } from "@webiny/cli/utils";

interface ILambdaFunctionResourceOutputsCodeAsset {
    path: string;
}

interface ILambdaFunctionResource {
    type: "aws:lambda/function:Function";
    outputs: {
        name: string;
        code: {
            assets: {
                [key: string]: ILambdaFunctionResourceOutputsCodeAsset;
            };
        };
    };
}

export type IImportStackResponseDeploymentResource = ILambdaFunctionResource;

export interface IImportStackResponseDeployment {
    resources: IImportStackResponseDeploymentResource[];
}

export interface IImportStackResponse {
    deployment: IImportStackResponseDeployment;
}

const runImportStack = ({
    folder,
    env,
    variant,
    cwd,
    file
}: Pick<IUserCommandInput, "folder" | "env" | "variant" | "cwd" | "file">) => {
    const project = getProject();

    try {
        const command = ["webiny", "pulumi", folder, "--env", env];
        if (variant) {
            command.push("--variant", variant);
        }

        command.push("--", "stack", "import", "--file", file!);

        const { stdout } = execa.sync("yarn", command.filter(Boolean), {
            cwd: cwd || project.root
        });

        const parsed = JSON.parse(stdout);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return parsed;
    } catch (e) {
        return null;
    }
};

export const importStack = (
    args: Pick<IUserCommandInput, "folder" | "env" | "variant" | "cwd" | "file">
): IImportStackResponse => {
    if (!args.folder) {
        throw new Error(`Please specify a project application folder, for example "apps/admin".`);
    }

    if (!args.env) {
        throw new Error(`Please specify environment, for example "dev".`);
    }

    if (!args.file) {
        throw new Error(`Please specify path to the file (JSON) to import the stack from.`);
    }

    return runImportStack(args);
};
