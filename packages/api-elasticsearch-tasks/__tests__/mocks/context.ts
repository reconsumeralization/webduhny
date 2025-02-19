import { PluginsContainer } from "@webiny/plugins";
import { PartialDeep } from "type-fest";
import { createMockIdentity } from "~tests/mocks/identity";
import type {
    Context,
    ITaskLogUpdateInput,
    ITaskUpdateData,
    IUpdateTaskResponse
} from "@webiny/tasks/types";
import { ElasticsearchContext } from "@webiny/api-elasticsearch/types";
// @ts-expect-error
import { createMockApiLog } from "@webiny/project-utils/testing/mockApiLog";
import type { Tenant } from "@webiny/api-tenancy/types";
import type { Context as LoggerContext } from "@webiny/api-log/types";

export const createContextMock = (
    params?: PartialDeep<Context & ElasticsearchContext & LoggerContext>
): Context & ElasticsearchContext & LoggerContext => {
    const tenants: Tenant[] = [
        {
            id: "root",
            name: "Root",
            parent: null
        } as Tenant
    ];
    const locales = [
        {
            code: "en-US",
            default: true
        }
    ];
    return {
        logger: createMockApiLog(),
        tenancy: {
            listTenants: async () => {
                return tenants;
            },
            withEachTenant: async (input: Tenant[], cb: (t: Tenant) => Promise<any>) => {
                const results = [];
                for (const t of input) {
                    results.push(await cb(t));
                }
                return results;
            }
        },
        i18n: {
            locales: {
                listLocales: async () => {
                    return [
                        locales,
                        {
                            totalCount: locales.length,
                            hasMoreItems: false,
                            cursor: null
                        }
                    ];
                }
            },
            getLocales: async () => {
                return locales;
            }
        },
        ...params,
        plugins: params?.plugins || new PluginsContainer(),
        tasks: {
            updateTask: async (
                id: string,
                data: Required<ITaskUpdateData>
            ): Promise<IUpdateTaskResponse> => {
                return {
                    ...data,
                    id,
                    startedOn: new Date().toISOString(),
                    finishedOn: undefined,
                    createdOn: new Date().toISOString(),
                    savedOn: new Date().toISOString(),
                    definitionId: "myCustomTaskDefinition",
                    createdBy: createMockIdentity(),
                    eventResponse: {} as any
                };
            },
            updateLog: async (id: string, data: ITaskLogUpdateInput) => {
                return {
                    ...data,
                    id,
                    createdOn: new Date().toISOString(),
                    createdBy: createMockIdentity()
                };
            },
            ...params?.tasks
        }
    } as unknown as Context & ElasticsearchContext & LoggerContext;
};
