import { attachToDynamoDbDocument } from "~/sync/attachToDynamoDbDocument.js";
import { createHandler } from "~/sync/createHandler";
import { createMockSystem } from "./mocks/system";
import { createMockManifest } from "./mocks/manifest";
import { getDocumentClient } from "@webiny/aws-sdk/client-dynamodb/getDocumentClient";

describe("attachToDynamoDbDocument", () => {
    it("should attach a decorator to the DynamoDB DocumentClient", async () => {
        const initialClient = getDocumentClient();
        // @ts-expect-error
        expect(initialClient.__decoratedByWebiny).toBeUndefined();

        const { handler } = createHandler({
            system: createMockSystem(),
            manifest: createMockManifest(),
            commandConverters: []
        });

        attachToDynamoDbDocument({
            handler
        });

        const client = getDocumentClient();
        // @ts-expect-error
        expect(client.__decoratedByWebiny).toBe(true);
    });

    it("should not have attached decorator", async () => {
        const client = getDocumentClient();
        // @ts-expect-error
        expect(client.__decoratedByWebiny).toBeUndefined();

        const anotherClient = getDocumentClient();
        // @ts-expect-error
        expect(anotherClient.__decoratedByWebiny).toBeUndefined();
    });
});
