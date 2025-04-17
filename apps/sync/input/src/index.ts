import { createHandler } from "@webiny/api-sync-system";

const debug = process.env.DEBUG === "true";

export const handler = createHandler({
    plugins: [],
    debug
});
