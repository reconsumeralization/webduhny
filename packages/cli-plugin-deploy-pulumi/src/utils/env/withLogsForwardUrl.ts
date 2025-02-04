import { createConfiguration } from "./configuration";

export interface IWithLogsForwardUrlParams {
    url: string | null | undefined;
}

export const withLogsForwardUrl = (params: IWithLogsForwardUrlParams) => {
    return createConfiguration(() => {
        const url = params.url;
        if (!url || url.length < 5) {
            return;
        }
        return {
            WEBINY_LOGS_FORWARD_URL: url
        };
    });
};
