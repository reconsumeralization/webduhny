// GUILD (whole file)
import { PbContext, OnPageBeforeUpdateTopicParams } from "@webiny/api-page-builder/types";
import { ContextPlugin } from "@webiny/handler";

// Make sure to import the `Context` interface and pass it to the `GraphQLSchemaPlugin`
// plugin. Apart from making your application code type-safe, it will also make the
// interaction with the `context` object significantly easier.
import { createGraphQLSchemaPlugin, Context } from "@webiny/api-serverless-cms";

// We need this interface for the event subscription below.
// It will enable you to have proper autocomplete on your new fields.
interface GuildPageSettingsBrandParams extends OnPageBeforeUpdateTopicParams {
    page: OnPageBeforeUpdateTopicParams["page"] & {
        settings: {
            brand: {
                buttonColor?: string;
                buttonHoverColor?: string;
                pictogramStrokeColor?: string;
                pictogramCircleColor?: string;
                employerNickname?: string;
                employerFullName?: string;
                employerUuid?: string;
                isTaxGrossUp?: string;
            };
        };
    };
    input: OnPageBeforeUpdateTopicParams["input"] & {};
    original: OnPageBeforeUpdateTopicParams["original"] & {};
}

export const guildPageSettingsBrandApi = [
    // Add `brand` to the page settings types
    createGraphQLSchemaPlugin({
        typeDefs: /* GraphQL */ `
            type PbBrandPageSettings {
                buttonColor: String
                buttonHoverColor: String
                pictogramStrokeColor: String
                pictogramCircleColor: String
                employerNickname: String
                employerFullName: String
                employerUuid: String
                isTaxGrossUp: String
            }

            input PbBrandPageSettingsInput {
                buttonColor: String
                buttonHoverColor: String
                pictogramStrokeColor: String
                pictogramCircleColor: String
                employerNickname: String
                employerFullName: String
                employerUuid: String
                isTaxGrossUp: String
            }

            extend type PbPageSettings {
                brand: PbBrandPageSettings
            }

            extend input PbPageSettingsInput {
                brand: PbBrandPageSettingsInput
            }
        `
    }),
    // Subscribe to the page update event using the ContextPlugin.
    new ContextPlugin<PbContext>(({ pageBuilder }) => {
        // We are passing a custom event type to allow us to use the new `brand` fields.
        pageBuilder.onPageBeforeUpdate.subscribe<GuildPageSettingsBrandParams>(
            ({ page, input }) => {
                // make sure the brand is initialized
                if (!page.settings.brand) {
                    page.settings.brand = {};
                }

                // Explicitly assign the field value from GraphQL input to the data that is used to update the page.
                page.settings.brand.buttonColor = input?.settings?.brand?.buttonColor;
                page.settings.brand.buttonHoverColor = input?.settings?.brand?.buttonHoverColor;
                page.settings.brand.pictogramStrokeColor =
                    input?.settings?.brand?.pictogramStrokeColor;
                page.settings.brand.pictogramCircleColor =
                    input?.settings?.brand?.pictogramCircleColor;
                page.settings.brand.isTaxGrossUp = input?.settings?.brand?.isTaxGrossUp;
            }
        );
    })
];
