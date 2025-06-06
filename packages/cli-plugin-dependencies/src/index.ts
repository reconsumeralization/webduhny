import path from "path";
import { CliCommandPlugin, CliCommandPluginArgs, type Yargs } from "@webiny/cli/types";
import { createDependencyTree } from "./references";
import { createReferenceFile } from "./references/createReferenceFile";
import { verifyDependencies } from "./references/verifyDependencies";

const getDirname = (): string => {
    let name = __dirname;
    if (name.endsWith("/dist")) {
        name = name.replace("/dist", "");
    }
    return path.join(name, "../cli/files/");
};

const createReferenceFileCommandExecutor = ({ context }: Pick<CliCommandPluginArgs, "context">) => {
    return async () => {
        const dirname = getDirname();
        const tree = createDependencyTree({
            context,
            dirname
        });

        createReferenceFile({
            tree,
            dirname,
            context
        });
    };
};

interface IVerifyDependenciesFileCommandExecutorParams {
    allowedDuplicates?: string;
    ["allowed-duplicates"]?: string;
}

const getAllowedDuplicates = (params: IVerifyDependenciesFileCommandExecutorParams): string[] => {
    const allowedDuplicates = params.allowedDuplicates || params["allowed-duplicates"];
    if (!allowedDuplicates || typeof allowedDuplicates !== "string") {
        return [];
    }
    return allowedDuplicates
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);
};

const verifyDependenciesFileCommandExecutor = ({
    context
}: Pick<CliCommandPluginArgs, "context">) => {
    return async (input: unknown) => {
        const params = input as IVerifyDependenciesFileCommandExecutorParams;

        const dirname = getDirname();
        const tree = createDependencyTree({
            context,
            dirname
        });

        verifyDependencies({
            tree,
            dirname,
            allowedDuplicates: getAllowedDuplicates(params)
        });
    };
};

export default (): CliCommandPlugin[] => {
    return [
        {
            type: "cli-command",
            name: "cli-command-sync-dependencies",
            create({ yargs, context }) {
                yargs.command(
                    "sync-dependencies",
                    "Sync dependencies for all packages.",
                    () => {},
                    createReferenceFileCommandExecutor({ context })
                );
            }
        },
        {
            type: "cli-command",
            name: "cli-command-verify-dependencies",
            create({ yargs, context }) {
                yargs.command(
                    "verify-dependencies",
                    "Verify dependencies for all packages.",
                    (yargs: Yargs) => {
                        yargs.option("max-duplicates", {
                            describe: `Max allowed duplicates in the dependency tree. If there are more than this number, the command will fail.`,
                            type: "number",
                            required: false
                        });
                    },
                    verifyDependenciesFileCommandExecutor({ context })
                );
            }
        }
    ];
};
