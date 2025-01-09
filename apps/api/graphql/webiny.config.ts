import { createBuildFunction, createWatchFunction } from "@webiny/project-utils";

export default {
    commands: {
        build: createBuildFunction({
            cwd: __dirname,
            overrides: {
                rspack: config => {
                    config.output.libraryTarget = "commonjs2";
                    return config;
                }
            }
        }),
        watch: createWatchFunction({ cwd: __dirname })
    }
};
