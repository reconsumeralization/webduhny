import type { I18NContextObject } from "@webiny/api-i18n/types";
import { CreateElasticsearchIndexTaskPlugin } from "~/tasks/createIndexes/CreateElasticsearchIndexTaskPlugin";
import type { CreateElasticsearchIndexTaskPluginIndex } from "~/tasks/createIndexes/CreateElasticsearchIndexTaskPlugin";
import type { Context } from "~/types";
import type { Tenant } from "@webiny/api-tenancy/types";

export interface IListIndexesParams {
    context: Context;
}

export const listIndexes = async (
    params: IListIndexesParams
): Promise<CreateElasticsearchIndexTaskPluginIndex[]> => {
    const { context } = params;

    const plugins = context.plugins.byType<CreateElasticsearchIndexTaskPlugin<Context>>(
        CreateElasticsearchIndexTaskPlugin.type
    );
    if (plugins.length === 0) {
        throw new Error("No index plugins found.");
    }

    const i18n: I18NContextObject = context.i18n;

    const tenants = await context.tenancy.listTenants();
    const results = await context.tenancy.withEachTenant<
        Tenant,
        CreateElasticsearchIndexTaskPluginIndex[]
    >(tenants, async tenant => {
        const indexes: CreateElasticsearchIndexTaskPluginIndex[] = [];
        const [locales] = await i18n.locales.listLocales();

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
