import { createGetEnvOptional } from "~/env/base";

export const getEnvVariableLogsForwardUrl = createGetEnvOptional<string>({
    name: "WEBINY_LOGS_FORWARD_URL",
    defaultValue: ""
});
