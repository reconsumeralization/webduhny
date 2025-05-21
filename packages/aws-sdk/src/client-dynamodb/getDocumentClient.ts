import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, TranslateConfig } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

export interface IDecorateDocumentClientCallable {
    (client: DynamoDBDocument): DynamoDBDocument;
}

let decorateDocumentClientCallable: IDecorateDocumentClientCallable | undefined = undefined;

const DEFAULT_CONFIG = {
    region: process.env.AWS_REGION
};

const createKey = (config: DynamoDBClientConfig): string => {
    const key = JSON.stringify(config);
    const hash = crypto.createHash("sha1");
    hash.update(key);
    return hash.digest("hex");
};

const documentClients: Record<string, DynamoDBDocument> = {};
/**
 * We do not want users to be able to change these options, so we are not exposing them.
 */
const documentClientConfig: TranslateConfig = {
    marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true,
        convertClassInstanceToMap: true
    }
};

export const getDocumentClient = (input?: DynamoDBClientConfig): DynamoDBDocument => {
    const config = input || DEFAULT_CONFIG;
    const key = createKey(config);
    if (documentClients[key]) {
        console.log({
            existingKey: key
        });
        return applyDecoration(documentClients[key]);
    }
    const client = new DynamoDBClient(config);

    const documentClient = DynamoDBDocument.from(client, documentClientConfig);
    console.log({
        newKey: key
    });

    return (documentClients[key] = applyDecoration(documentClient));
};
/**
 * Client will not be decorated more than once.
 */
const applyDecoration = (client: DynamoDBDocument): DynamoDBDocument => {
    if (!decorateDocumentClientCallable) {
        console.log("No decoration function provided.");
        return client;
    }
    console.log("applying decoration");
    // @ts-expect-error
    client.__decoratedByWebiny = true;
    return decorateDocumentClientCallable(client);
};

export const decorateDocumentClient = (cb: IDecorateDocumentClientCallable): void => {
    decorateDocumentClientCallable = cb;
    /**
     * Decorate already existing clients.
     */
    for (const key in documentClients) {
        cb(documentClients[key]);
    }
};
