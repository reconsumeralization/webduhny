import { CreateElasticsearchIndexTaskPlugin } from "~/tasks/createIndexes/CreateElasticsearchIndexTaskPlugin";
import type { Context } from "~/types";
import type { PluginsContainer } from "@webiny/plugins";

export const listCreateElasticsearchIndexTaskPlugin = <C extends Context = Context>(
    plugins: PluginsContainer
): CreateElasticsearchIndexTaskPlugin<C>[] => {
    return plugins.byType<CreateElasticsearchIndexTaskPlugin<Context>>(
        CreateElasticsearchIndexTaskPlugin.type
    );
};
