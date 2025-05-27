import { type CliContext } from "@webiny/cli/types";

const KEY = "must-refresh-before-deploy";

export const setMustRefreshBeforeDeploy = (context: CliContext) => {
    return context.localStorage.set(KEY, true);
};

export const unsetMustRefreshBeforeDeploy = (context: CliContext) => {
    return context.localStorage.set(KEY, false);
};

export const getMustRefreshBeforeDeploy = (context: CliContext) => {
    return context.localStorage.get(KEY);
};
