import { Context as BaseContext } from "@webiny/api";
import { Context } from "@webiny/handler/types";
import { PluginsContainer } from "@webiny/plugins";
import type { Client } from "@webiny/project-utils/testing/elasticsearch/createClient.js";
import type { ElasticsearchContext } from "@webiny/api-elasticsearch/types.js";
import type { ILogger } from "@webiny/api-log/types.js";
import { Reply, Request } from "@webiny/handler-aws/types.js";

export interface ICreateMockContextParams {
    plugins?: PluginsContainer;
    elasticsearch: Client;
    logger: ILogger;
}

export const createMockContext = (
    params: ICreateMockContextParams
): ElasticsearchContext & Context => {
    const context = new BaseContext({
        plugins: params.plugins || new PluginsContainer(),
        WEBINY_VERSION: "0.0.0"
    });

    // @ts-expect-error
    context.elasticsearch = params.elasticsearch;
    // @ts-expect-error
    context.logger = params.logger;
    // @ts-expect-error
    context.reply = {} as Reply;
    // @ts-expect-error
    context.request = {} as Request;

    return context as unknown as Context & ElasticsearchContext;
};
