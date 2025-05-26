import { createGraphQLSchemaPlugin, InstallTenant,  } from "@webiny/api-serverless-cms";
import { CmsGraphQLSchemaPlugin, createCmsGraphQLSchemaPlugin } from "@webiny/api-headless-cms";

export const createExtension = () => {
    return [
        createGraphQLSchemaPlugin({
            typeDefs: /* GraphQL */ `
                extend type TenancyMutation {
                    installTenant(tenantId: ID!): TenantResponse
                }
            `,
            resolvers: {
                TenancyMutation: {
                    installTenant: async (_, args, context) => {
                        const tenant = await context.tenancy.getTenantById(args.tenantId);
                        if (!tenant) {
                            throw new Error(`Tenant "${args.tenantId}" not found.`);
                        }

                        const installTenant = new InstallTenant(context);
                        await installTenant.execute(tenant, {
                            i18n: { defaultLocaleCode: "en-US" }
                        });
                        return tenant;
                    }
                }
            }
        })
    ];
};
