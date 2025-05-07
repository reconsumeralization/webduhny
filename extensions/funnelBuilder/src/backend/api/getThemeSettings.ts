import { createGraphQLSchemaPlugin } from "@webiny/api-serverless-cms";
import { Response, ErrorResponse } from "@webiny/handler-graphql";
import { ThemeSettings } from "../../shared/types";

export const getThemeSettings = () => {
    return createGraphQLSchemaPlugin({
        typeDefs: /* GraphQL */ `
            type ThemeSettingsError {
                code: String
                message: String
                data: JSON
                stack: String
            }

            type ThemeSettingsTheme {
                primaryColor: String!
                secondaryColor: String!
                logo: String
            }

            type ThemeSettings {
                id: ID
                name: String
                theme: ThemeSettingsTheme
            }

            type ThemeSettingsResponse {
                data: ThemeSettings
                error: ThemeSettingsError
            }
            extend type Query {
                themeSettings: ThemeSettingsResponse
            }
        `,
        resolvers: {
            Query: {
                themeSettings: async (_, __, context) => {
                    try {
                        const themeSettingsModel = await context.cms.getModel("themeSettings");

                        const themeSettings = await context.security.withoutAuthorization(async () => {
                            const themeSettingsEntry = await context.cms.getSingletonEntryManager(
                                themeSettingsModel
                            );
                            const settings = await themeSettingsEntry.get();

                            return settings.values as ThemeSettings;
                        });

                        return new Response(themeSettings);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                }
            }
        }
    });
};
