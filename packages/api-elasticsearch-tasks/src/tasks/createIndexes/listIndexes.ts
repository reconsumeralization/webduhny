import type { CreateElasticsearchIndexTaskPluginIndex } from "~/tasks/createIndexes/CreateElasticsearchIndexTaskPlugin";
import { CreateElasticsearchIndexTaskPlugin } from "~/tasks/createIndexes/CreateElasticsearchIndexTaskPlugin";
import type { Context } from "~/types";
import type { Tenant } from "@webiny/api-tenancy/types";
import { I18NLocale } from "@webiny/api-i18n/types";

export interface IListIndexesParams {
    context: Context;
    plugins: CreateElasticsearchIndexTaskPlugin<Context>[];
    tenants?: Tenant[];
    locales?: I18NLocale[];
}

export const listIndexes = async (
    params: IListIndexesParams
): Promise<CreateElasticsearchIndexTaskPluginIndex[]> => {
    const { context, plugins, tenants: inputTenants, locales: inputLocales } = params;
    if (plugins.length === 0) {
        return [];
    }

    const indexes: CreateElasticsearchIndexTaskPluginIndex[] = [];
    const tenants = inputTenants || (await context.tenancy.listTenants());
    const initialTenant = context.tenancy.getCurrentTenant();
    try {
        for (const tenant of tenants) {
            context.tenancy.setCurrentTenant(tenant);

            let locales = inputLocales ? [...inputLocales] : [];
            if (locales.length === 0) {
                const [localesResult] = await context.i18n.locales.listLocales({
                    limit: 10000
                });
                locales = localesResult;
            }

            for (const locale of locales) {
                for (const plugin of plugins) {
                    const results = await plugin.getIndexList({
                        context,
                        tenant: tenant.id,
                        locale: locale.code
                    });
                    for (const result of results) {
                        if (indexes.some(i => i.index === result.index)) {
                            continue;
                        }
                        indexes.push(result);
                    }
                }
            }
        }
    } finally {
        context.tenancy.setCurrentTenant(initialTenant);
    }

    return indexes;
};
