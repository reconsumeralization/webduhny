import zod from "zod";
import { ContextPlugin } from "@webiny/api";
import { CmsGraphQLSchemaPlugin } from "@webiny/api-headless-cms";
import { validateConfirmation } from "../helpers/confirmation";
import type { HcmsTasksContext } from "~/types";
import { createResolverDecorator, ErrorResponse, resolve, Response } from "@webiny/handler-graphql";
import { createZodError } from "@webiny/utils";
import type { IDeleteCmsModelTask } from "~/tasks/deleteModel/types";
import type { CmsModel } from "@webiny/api-headless-cms/types";
import { attachDeleteModelCrud } from "~/tasks/deleteModel/graphql/crud";

const deleteValidation = zod
    .object({
        modelId: zod.string(),
        confirmation: zod.string()
    })
    .superRefine((value, context) => {
        if (validateConfirmation(value)) {
            return;
        }
        context.addIssue({
            code: zod.ZodIssueCode.custom,
            message: `Confirmation input does not match.`,
            fatal: true,
            path: ["confirmation"]
        });
    })
    .readonly();

const abortValidation = zod
    .object({
        modelId: zod.string()
    })
    .readonly();

const getValidation = zod
    .object({
        modelId: zod.string()
    })
    .readonly();

export const createDeleteModelGraphQl = <T extends HcmsTasksContext = HcmsTasksContext>() => {
    const contextPlugin = new ContextPlugin<T>(async context => {
        attachDeleteModelCrud({ context });

        const plugin = new CmsGraphQLSchemaPlugin<T>({
            typeDefs: /* GraphQL */ `
                enum DeleteCmsModelTaskStatus {
                    running
                    done
                    error
                    aborted
                }
                type DeleteCmsModelTask {
                    id: ID!
                    status: DeleteCmsModelTaskStatus!
                    deleted: Int!
                    total: Int!
                }

                type GetDeleteCmsModelProgressResponse {
                    data: DeleteCmsModelTask
                    error: CmsError
                }

                type FullyDeleteCmsModelResponse {
                    data: DeleteCmsModelTask
                    error: CmsError
                }

                type AbortDeleteCmsModelResponse {
                    data: DeleteCmsModelTask
                    error: CmsError
                }

                extend type CmsContentModel {
                    isBeingDeleted: Boolean!
                }

                extend type Query {
                    getDeleteModelProgress(modelId: ID!): GetDeleteCmsModelProgressResponse!
                    listContentModels(
                        includeBeingDeleted: Boolean = false
                    ): CmsContentModelListResponse
                }

                extend type Mutation {
                    fullyDeleteModel(
                        modelId: ID!
                        confirmation: String!
                    ): FullyDeleteCmsModelResponse!
                    abortDeleteModel(modelId: ID!): AbortDeleteCmsModelResponse!
                }
            `,
            resolvers: {
                CmsContentModel: {
                    isBeingDeleted: async (model: CmsModel) => {
                        try {
                            return await context.cms.isModelBeingDeleted(model.modelId);
                        } catch (ex) {
                            console.error(ex);
                        }
                        return true;
                    }
                },
                Query: {
                    getDeleteModelProgress: async (_, args) => {
                        return resolve<IDeleteCmsModelTask>(async () => {
                            const input = getValidation.safeParse(args);
                            if (input.error) {
                                throw createZodError(input.error);
                            }
                            return await context.cms.getDeleteModelProgress(input.data.modelId);
                        });
                    }
                },
                Mutation: {
                    fullyDeleteModel: async (_, args) => {
                        return resolve<IDeleteCmsModelTask>(async () => {
                            const input = deleteValidation.safeParse(args);
                            if (input.error) {
                                throw createZodError(input.error);
                            }
                            return await context.cms.fullyDeleteModel(input.data.modelId);
                        });
                    },
                    abortDeleteModel: async (_, args) => {
                        return resolve<IDeleteCmsModelTask>(async () => {
                            const input = abortValidation.safeParse(args);
                            if (input.error) {
                                throw createZodError(input.error);
                            }
                            return await context.cms.abortDeleteModel(input.data.modelId);
                        });
                    }
                }
            },
            resolverDecorators: {
                ["Query.listContentModels"]: [
                    createResolverDecorator<any, any, HcmsTasksContext>(
                        resolver => async (parent, args, context, info) => {
                            const result = await resolver(parent, args, context, info);
                            if (result.error || !Array.isArray(result.data)) {
                                return result;
                            }

                            if (args?.includeBeingDeleted !== false) {
                                return result;
                            }

                            const listed = result.data as CmsModel[];

                            try {
                                const models = await context.cms.listGettingDeletedModels();

                                return new Response(
                                    listed.filter(model => {
                                        if (!model?.modelId) {
                                            return false;
                                        }
                                        if (models.includes(model.modelId)) {
                                            return false;
                                        }
                                        return true;
                                    })
                                );
                            } catch (ex) {
                                return new ErrorResponse(ex);
                            }
                        }
                    )
                ]
            }
        });
        plugin.name = "headless-cms.graphql.fullyDeleteModel";
        context.plugins.register(plugin);
    });
    contextPlugin.name = "headless-cms.context.createDeleteModelGraphQl";
    return contextPlugin;
};
