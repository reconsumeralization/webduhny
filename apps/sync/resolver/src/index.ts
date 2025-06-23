import { createResolverHandler } from "@webiny/api-sync-system";
import { getDocumentClient } from "@webiny/aws-sdk/client-dynamodb/getDocumentClient.js";

const debug = process.env.DEBUG === "true";

export const handler = createResolverHandler({
    plugins: [],
    debug,
    createDocumentClient: params => {
        return getDocumentClient(params);
    }
});
