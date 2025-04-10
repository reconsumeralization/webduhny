import { GraphQLSchemaPlugin } from "@webiny/handler-graphql";
import { filterSchema } from "~/filter/filter.gql";
import { createFoldersSchema } from "~/folder/folder.gql";
import { appGql } from "~/apps/app.gql";
import { AcoContext } from "~/types";
import { ContextPlugin } from "@webiny/api";
import { isHeadlessCmsReady } from "@webiny/api-headless-cms";
import type { CmsModel } from "@webiny/api-headless-cms/types";
import { createFieldTypePluginRecords } from "@webiny/api-headless-cms/graphql/schema/createFieldTypePluginRecords";
import { createGraphQLSchemaPluginFromFieldPlugins } from "@webiny/api-headless-cms/utils/getSchemaFromFieldPlugins";
import { FOLDER_MODEL_ID } from "~/folder/folder.model";

const emptyResolver = () => ({});

const baseSchema = new GraphQLSchemaPlugin({
    typeDefs: /* GraphQL */ `
        type AcoQuery {
            _empty: String
        }

        type AcoMutation {
            _empty: String
        }

        type SearchQuery {
            _empty: String
        }

        type SearchMutation {
            _empty: String
        }

        type AcoMeta {
            hasMoreItems: Boolean
            totalCount: Int
            cursor: String
        }

        type AcoUser {
            id: ID
            displayName: String
            type: String
        }

        type AcoError {
            code: String
            message: String
            data: JSON
            stack: String
        }

        type AcoBooleanResponse {
            data: Boolean
            error: AcoError
        }

        enum AcoSortDirection {
            ASC
            DESC
        }

        input AcoSort {
            id: AcoSortDirection
            createdOn: AcoSortDirection
            modifiedOn: AcoSortDirection
            savedOn: AcoSortDirection
            title: AcoSortDirection
        }

        input AcoSearchRecordTagListWhereInput {
            tags_in: [String!]
            tags_startsWith: String
            tags_not_startsWith: String
            createdBy: ID
            AND: [AcoSearchRecordTagListWhereInput!]
            OR: [AcoSearchRecordTagListWhereInput!]
        }

        type AcoSearchRecordMoveResponse {
            data: Boolean
            error: AcoError
        }

        type TagItem {
            tag: String!
            count: Int!
        }

        type AcoSearchRecordTagListResponse {
            data: [TagItem!]
            error: AcoError
            meta: AcoMeta
        }

        type AcoSearchLocationType {
            folderId: ID!
        }
        input AcoSearchLocationInput {
            folderId: ID!
        }

        extend type Query {
            aco: AcoQuery
            search: SearchQuery
        }

        extend type Mutation {
            aco: AcoMutation
            search: SearchMutation
        }
    `,
    resolvers: {
        Query: {
            aco: emptyResolver,
            search: emptyResolver
        },
        Mutation: {
            aco: emptyResolver,
            search: emptyResolver
        }
    }
});

export const createAcoGraphQL = () => {
    const folderSchema = new ContextPlugin<AcoContext>(async context => {
        if (!(await isHeadlessCmsReady(context))) {
            return;
        }

        await context.security.withoutAuthorization(async () => {
            const model = (await context.cms.getModel(FOLDER_MODEL_ID)) as CmsModel;
            const models = await context.cms.listModels();
            const fieldPlugins = createFieldTypePluginRecords(context.plugins);
            /**
             * We need to register all plugins for all the CMS fields.
             */
            const plugins = createGraphQLSchemaPluginFromFieldPlugins({
                models,
                type: "manage",
                fieldTypePlugins: fieldPlugins,
                createPlugin: ({ schema, type, fieldType }) => {
                    const plugin = new GraphQLSchemaPlugin(schema);
                    plugin.name = `aco.graphql.folder.schema.${type}.field.${fieldType}`;
                    return plugin;
                }
            });

            const graphQlPlugin = createFoldersSchema({
                model,
                models,
                plugins: fieldPlugins
            });

            context.plugins.register([...plugins, graphQlPlugin]);
        });
    });

    return [baseSchema, appGql, folderSchema, filterSchema];
};
