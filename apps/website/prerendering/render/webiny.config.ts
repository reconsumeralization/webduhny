import { createBuildFunction, createWatchFunction } from "@webiny/project-utils";

const rspack = config => {
    (config.externals as any).push("@sparticuz/chromium");
    return config;
};

export default {
    commands: {
        build: createBuildFunction({ cwd: __dirname, overrides: { rspack } }),
        watch: createWatchFunction({ cwd: __dirname, overrides: { rspack } })
    }
};
