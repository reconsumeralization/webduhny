import { createEventHandler as createSQSEventHandler } from "@webiny/handler-aws/sqs";
import { createResolverApp } from "./app/ResolverApplication.js";
import { convertException } from "@webiny/utils";
import { createRecordHandler } from "./app/RecordHandler.js";
import { CommandHandlerPlugin } from "./app/CommandHandlerPlugin.js";
import { createFetcher } from "~/resolver/app/fetcher/Fetcher.js";
import { getDocumentClient } from "@webiny/aws-sdk/client-dynamodb/index.js";
import { createStorer } from "~/resolver/app/storer/Storer.js";

/**
 * TODO maybe add logger?
 */
export const createEventHandlerPlugin = () => {
    return createSQSEventHandler(async ({ event, context, request, reply }) => {
        const fetcher = createFetcher({
            createDocumentClient: system => {
                return getDocumentClient({
                    region: system.region
                });
            }
        });
        const storer = createStorer({
            createDocumentClient: system => {
                return getDocumentClient({
                    region: system.region
                });
            }
        });
        const recordHandler = createRecordHandler({
            plugins: context.plugins,
            fetcher,
            storer
        });
        const app = createResolverApp({
            recordHandler
        });

        try {
            await app.resolve({
                records: event.Records
            });
        } catch (ex) {
            console.error(convertException(ex));
        }
    });
};
