import { createEventHandler as createSQSEventHandler } from "@webiny/handler-aws/sqs";
import { createResolverApp } from "./app/ResolverApplication.js";
import { convertException } from "@webiny/utils";
import { createRecordHandler } from "./app/RecordHandler.js";
import { createFetcher } from "~/resolver/app/fetcher/Fetcher.js";
import { createStorer } from "~/resolver/app/storer/Storer.js";
import { createDeploymentsFetcher } from "~/resolver/deployment/DeploymentsFetcher.js";
import { WebinyError } from "@webiny/error/index.js";
import type {
    DynamoDBClientConfig,
    DynamoDBDocument
} from "@webiny/aws-sdk/client-dynamodb/index.js";

export interface ICreateEventHandlerPluginParams {
    tableName: string | undefined;
    createDocumentClient: (params?: DynamoDBClientConfig) => DynamoDBDocument;
}
/**
 * TODO maybe add logger?
 */
export const createEventHandlerPlugin = (params: ICreateEventHandlerPluginParams) => {
    const { createDocumentClient, tableName } = params;

    return createSQSEventHandler(async ({ event, context, reply }) => {
        if (!tableName) {
            throw new WebinyError({
                message: "Table name variable is not set."
            });
        }
        try {
            const fetcher = createFetcher({
                createDocumentClient: deployment => {
                    return createDocumentClient({
                        region: deployment.region
                    });
                }
            });

            const deploymentsFetcher = createDeploymentsFetcher({
                client: createDocumentClient(),
                table: tableName
            });

            const deployments = await deploymentsFetcher.fetch();

            const storer = createStorer({
                deployments,
                createDocumentClient: deployment => {
                    return createDocumentClient({
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
            await app.resolve({
                records: event.Records
            });
            return reply.send({
                ok: true
            });
        } catch (ex) {
            console.error(convertException(ex));
            return reply.send(ex);
        }
    });
};
