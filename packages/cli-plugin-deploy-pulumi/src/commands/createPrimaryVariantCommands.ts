import type yargs from "yargs";
import type { Context, IUserCommandInput } from "~/types";
import { executeSetPrimaryVariantCommand } from "./primaryVariant/executeSetPrimaryVariantCommand";
import { validateVariantName } from "~/utils";

export interface IPrimaryVariantCommand {
    yargs: typeof yargs;
    context: Context;
}

const validateVariant = (args: Pick<IUserCommandInput, "variant">): boolean => {
    validateVariantName(args);
    return true;
};
/**
 * Command to set a primary variant does not require a region because it is already contained inside the stack output.
 */
export const createPrimaryVariantCommands = (params: IPrimaryVariantCommand): void => {
    const { yargs, context } = params;

    yargs.command(
        "set-primary-variant",
        `Set a deployed system as primary variant.`,
        () => {
            yargs.example("$0 set-primary-variant --env dev --variant=blue", "");
            yargs.example("$0 set-primary-variant --env dev --variant=green", "");

            yargs.option("env", {
                describe: `Environment`,
                type: "string",
                required: true
            });
            yargs
                .option("primary", {
                    describe: `Primary variant`,
                    type: "string",
                    required: true
                })
                .check(args => {
                    validateVariantName({
                        variant: args.primary
                    });
                    return true;
                });
            yargs
                .option("secondary", {
                    describe: `Secondary variant`,
                    type: "string",
                    required: true
                })
                .check(args => {
                    validateVariantName({
                        variant: args.secondary
                    });
                    return true;
                });
        },
        async argv => {
            return executeSetPrimaryVariantCommand({
                env: argv.env as string,
                primary: (argv.primary || undefined) as string | undefined,
                secondary: (argv.secondary || undefined) as string | undefined,
                context
            });
        }
    );
};
