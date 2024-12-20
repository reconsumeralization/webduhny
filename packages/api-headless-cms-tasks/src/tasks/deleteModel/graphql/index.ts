import zod from "zod";
import { ContextPlugin } from "@webiny/api";
import { CmsGraphQLSchemaPlugin, isHeadlessCmsReady } from "@webiny/api-headless-cms";
import { validateConfirmation } from "../helpers/confirmation";
import type { HcmsTasksContext } from "~/types";
import { createResolverDecorator, ErrorResponse, resolve, Response } from "@webiny/handler-graphql";
import { createZodError } from "@webiny/utils";
import type { IDeleteCmsModelTask } from "~/tasks/deleteModel/types";
import type { CmsModel } from "@webiny/api-headless-cms/types";
import { createDeleteModelCrud } from "~/tasks/deleteModel/graphql/crud";

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

const cancelValidation = zod
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
        const ready = await isHeadlessCmsReady(context);
        if (!ready) {
            return;
        }

        context.cms.modelDelete = createDeleteModelCrud({ context });

        const plugin = new CmsGraphQLSchemaPlugin<T>({
            typeDefs: /* GraphQL */ `
                enum DeleteCmsModelTaskStatus {
                    running
                    done
                    error
                    canceled
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

                type CancelDeleteCmsModelResponse {
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
                    cancelFullyDeleteModel(modelId: ID!): CancelDeleteCmsModelResponse!
                }
            `,
            resolvers: {
                CmsContentModel: {
                    isBeingDeleted: async (model: CmsModel) => {
                        try {
                            return await context.cms.modelDelete.isModelBeingDeleted(model.modelId);
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
                            return await context.cms.modelDelete.getDeleteModelProgress(
                                input.data.modelId
                            );
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
                            return await context.cms.modelDelete.fullyDeleteModel(
                                input.data.modelId
                            );
                        });
                    },
                    cancelFullyDeleteModel: async (_, args) => {
                        return resolve<IDeleteCmsModelTask>(async () => {
                            const input = cancelValidation.safeParse(args);
                            if (input.error) {
                                throw createZodError(input.error);
                            }
                            return await context.cms.modelDelete.cancelFullyDeleteModel(
                                input.data.modelId
                            );
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
                                const beingDeletedList =
                                    await context.cms.modelDelete.listModelsBeingDeleted();

                                return new Response(
                                    listed.filter(model => {
                                        if (!model?.modelId) {
                                            return false;
                                        } else if (
                                            beingDeletedList.some(
                                                item => item.modelId === model.modelId
                                            )
                                        ) {
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
