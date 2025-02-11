import type yargs from "yargs";
import type { Context } from "~/types";
import { executeSetPrimaryVariantCommand } from "./primaryVariant/executeSetPrimaryVariantCommand";

export interface IPrimaryVariantCommand {
    yargs: typeof yargs;
    context: Context;
}

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
            yargs.option("primary", {
                describe: `Primary variant`,
                type: "string",
                required: true
            });
            yargs.option("secondary", {
                describe: `Secondary variant`,
                type: "string",
                required: true
            });
        },
        async argv => {
            return executeSetPrimaryVariantCommand({
                env: argv.env as string,
                primary: argv.primary as string,
                secondary: argv.secondary as string,
                context
            });
        }
    );
};
