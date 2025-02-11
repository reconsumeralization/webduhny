import { getStackOutput } from "~/utils";
import type { IStackOutput } from "~/utils";
import { getStacks } from "./getStacks";

export interface IGetStacksOutputParams {
    folder: string;
    env: string;
    cwd?: string;
}

export interface IGetStacksOutputResultStack {
    env: string;
    variant: string | undefined;
    output: IStackOutput;
}

export interface IGetStacksOutputResult {
    app: string;
    env: string;
    stacks: IGetStacksOutputResultStack[];
}

export const getStacksOutput = async (
    params: IGetStacksOutputParams
): Promise<IGetStacksOutputResult> => {
    const stacks = getStacks(params);

    try {
        const results = await Promise.all(
            stacks.stacks.map(async stack => {
                const output = getStackOutput({
                    cwd: params.cwd,
                    folder: params.folder,
                    env: stack.env,
                    variant: stack.variant
                });

                return stack.withOutput(output);
            })
        );

        return {
            app: stacks.app,
            env: stacks.env,
            stacks: results
        };
    } catch (ex) {
        console.error("Could not get stack output.");
        console.log(ex);
        throw ex;
    }
};
