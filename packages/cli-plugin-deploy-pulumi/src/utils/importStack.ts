import { IUserCommandInput } from "~/types";
import execa from "execa";
import { getProject } from "@webiny/cli/utils";

const runImportStack = ({
    folder,
    env,
    variant,
    cwd,
    file
}: Pick<IUserCommandInput, "folder" | "env" | "variant" | "cwd" | "file">) => {
    const project = getProject();

    const command = ["webiny", "pulumi", folder, "--env", env];
    if (variant) {
        command.push("--variant", variant);
    }

    command.push("--", "stack", "import", "--file", file!);

    return execa.sync("yarn", command.filter(Boolean), {
        cwd: cwd || project.root
    });
};

export const importStack = (
    args: Pick<IUserCommandInput, "folder" | "env" | "variant" | "cwd" | "file">
) => {
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
