import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, TranslateConfig } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

export interface IEnableEnrichDocumentClientCallable {
    (client: DynamoDBDocument): DynamoDBDocument;
}

let enrichDocumentClientCallable: IEnableEnrichDocumentClientCallable | undefined = undefined;

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
        return applyEnrichment(documentClients[key]);
    }
    const client = new DynamoDBClient(config);

    const documentClient = DynamoDBDocument.from(client, documentClientConfig);

    return (documentClients[key] = applyEnrichment(documentClient));
};
/**
 * Client will not be enriched more than once.
 */
const applyEnrichment = (client: DynamoDBDocument): DynamoDBDocument => {
    if (!enrichDocumentClientCallable) {
        return client;
    }
    /**
     * If client is already enriched, let's skip enrichment.
     */
    // @ts-expect-error
    else if (client.__enrichedByWebiny) {
        return client;
    }
    // @ts-expect-error
    client.__enrichedByWebiny = true;
    return enrichDocumentClientCallable(client);
};

export const enableEnrichDocumentClient = (cb: IEnableEnrichDocumentClientCallable): void => {
    /**
     * This will probably show during the development phase.
     */
    if (enrichDocumentClientCallable) {
        throw new Error("EnrichDocumentClient is already enabled.");
    }
    enrichDocumentClientCallable = cb;
};
