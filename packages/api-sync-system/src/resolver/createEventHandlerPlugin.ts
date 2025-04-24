import { createEventHandler as createSQSEventHandler } from "@webiny/handler-aws/sqs";
import { createResolverApp } from "./app/ResolverApplication.js";
import { convertException } from "@webiny/utils";
import { createRecordHandler } from "./app/RecordHandler.js";
import { createFetcher } from "~/resolver/app/fetcher/Fetcher.js";
import { getDocumentClient } from "@webiny/aws-sdk/client-dynamodb/index.js";
import { createStorer } from "~/resolver/app/storer/Storer.js";
import { createDeploymentsFetcher } from "~/resolver/deployment/DeploymentsFetcher.js";
import { WebinyError } from "@webiny/error/index.js";

/**
 * TODO maybe add logger?
 */
export const createEventHandlerPlugin = () => {
    return createSQSEventHandler(async ({ event, context }) => {
        const fetcher = createFetcher({
            createDocumentClient: deployment => {
                return getDocumentClient({
                    region: deployment.region
                });
            }
        });

        const tableName = process.env.DB_TABLE;
        if (!tableName) {
            throw new WebinyError({
                message: "DB_TABLE environment variable is not set."
            });
        }

        const deploymentsFetcher = createDeploymentsFetcher({
            client: getDocumentClient(),
            table: tableName
        });

        const deployments = await deploymentsFetcher.fetch();

        const storer = createStorer({
            deployments,
            createDocumentClient: deployment => {
                return getDocumentClient({
                    region: deployment.region
                });
            }
        });
        const recordHandler = createRecordHandler({
            plugins: context.plugins,
            fetcher,
            storer
        });
        const app = createResolverApp({
            recordHandler,
            deployments
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
