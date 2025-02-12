import { WcpContext } from "./types";
import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import { ErrorResponse, Response } from "@webiny/handler-graphql/responses";

const emptyResolver = () => ({});

export const createWcpGraphQL = () => {
    return new GraphQLSchemaPlugin<WcpContext>({
        typeDefs: /* GraphQL */ `
            type WcpProjectPackageFeaturesFeature {
                enabled: Boolean
                options: JSON
            }

            type WcpProjectPackageFeatures {
                seats: WcpProjectPackageFeaturesFeature
                multiTenancy: WcpProjectPackageFeaturesFeature
                advancedPublishingWorkflow: WcpProjectPackageFeaturesFeature
                advancedAccessControlLayer: WcpProjectPackageFeaturesFeature
                auditLogs: WcpProjectPackageFeaturesFeature
                recordLocking: WcpProjectPackageFeaturesFeature
                fileManager: WcpProjectPackageFeaturesFeature
            }

            type WcpProjectPackage {
                features: WcpProjectPackageFeatures
            }

            type WcpProject {
                orgId: ID
                projectId: ID
                package: WcpProjectPackage
            }

            type WcpError {
                code: String
                message: String
                data: JSON
                stack: String
            }

            type WcpProjectResponse {
                data: WcpProject
                error: WcpError
            }

            type WcpQuery {
                getProject: WcpProjectResponse
            }

            type WcpMutation {
                updateProject: WcpProjectResponse
            }

            extend type Query {
                wcp: WcpQuery
            }

            extend type Mutation {
                wcp: WcpMutation
            }
        `,
        resolvers: {
            Query: {
                wcp: emptyResolver
            },
            WcpQuery: {
                getProject: (_, __, context) => {
                    try {
                        return new Response(context.wcp.getProject());
                    } catch (e) {
                        return new ErrorResponse({
                            code: "COULD_NOT_GET_PROJECT",
                            message: e.message,
                            data: null,
                            stack: e.stack
                        });
                    }
                }
            }
        }
    });
};
