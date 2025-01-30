import { CliContext } from "@webiny/cli/types";

export interface IOptions {
    env: string;
    debug?: boolean;
    cwd: string;
    logs: boolean;
}

export interface IConfigResult {
    commands: {
        build: (options: IOptions) => Promise<void>;
        watch: (options: IOptions, context: CliContext) => Promise<void>;
    };
}

export interface IRequireConfigParams {
    [key: string]: Record<string, any>;
}

export const requireConfig = <T extends IConfigResult = IConfigResult>(
    input: string,
    params?: IRequireConfigParams
): T => {
    const required = require(input);
    /**
     * There is a possibility that the config is a default export.
     */
    const resolved = required.default || required;
    if (typeof resolved === "function") {
        return resolved(params);
    }
    return resolved;
};
