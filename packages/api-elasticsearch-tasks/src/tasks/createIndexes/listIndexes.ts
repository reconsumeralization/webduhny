import type { CreateElasticsearchIndexTaskPluginIndex } from "~/tasks/createIndexes/CreateElasticsearchIndexTaskPlugin";
import { CreateElasticsearchIndexTaskPlugin } from "~/tasks/createIndexes/CreateElasticsearchIndexTaskPlugin";
import type { Context } from "~/types";
import type { Tenant } from "@webiny/api-tenancy/types";

export interface IListIndexesParams {
    context: Context;
    plugins: CreateElasticsearchIndexTaskPlugin<Context>[];
}

export const listIndexes = async (
    params: IListIndexesParams
): Promise<CreateElasticsearchIndexTaskPluginIndex[]> => {
    const { context, plugins } = params;
    if (plugins.length === 0) {
        return [];
    }

    const tenants = await context.tenancy.listTenants();
    const results = await context.tenancy.withEachTenant<
        Tenant,
        CreateElasticsearchIndexTaskPluginIndex[]
    >(tenants, async tenant => {
        const indexes: CreateElasticsearchIndexTaskPluginIndex[] = [];
        const [locales] = await context.i18n.locales.listLocales();

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
        return indexes;
    });
    return results.flat();
};
