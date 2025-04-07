import { createHandler } from "@webiny/handler-aws";

const debug = process.env.DEBUG === "true";

export const handler = createHandler({
    plugins: [],
    debug
});
