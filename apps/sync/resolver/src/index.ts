import { createResolverHandler } from "@webiny/api-sync-system/resolver";

const debug = process.env.DEBUG === "true";

export const handler = createResolverHandler({
    plugins: [],
    debug
});
