import type { Context } from "~/types";
import type { IndexManager } from "~/settings";
import { listIndexes } from "./listIndexes";
import { createIndexFactory } from "~/tasks/createIndexes/createIndex";
import { listCreateElasticsearchIndexTaskPlugin } from "~/tasks/createIndexes/listCreateElasticsearchIndexTaskPlugin";

export interface IOnBeforeTriggerParams {
    indexManager: IndexManager;
    context: Context;
}

export class OnBeforeTrigger {
    private readonly context: Context;
    private readonly indexManager: IndexManager;

    public constructor(params: IOnBeforeTriggerParams) {
        this.context = params.context;
        this.indexManager = params.indexManager;
    }

    public async run(targets: string[] | undefined): Promise<void> {
        const plugins = listCreateElasticsearchIndexTaskPlugin<Context>(this.context.plugins);

        try {
            const allIndexes = await listIndexes({
                context: this.context,
                plugins
            });
            const indexes = allIndexes.filter(index => {
                if (!targets?.length) {
                    return true;
                }
                for (const t of targets) {
                    if (index.index.includes(t)) {
                        return true;
                    }
                }
                return false;
            });
            if (indexes.length === 0) {
                console.warn(
                    "There are no indexes to create before triggering the Create indexes task.",
                    {
                        targets
                    }
                );
                return;
            }

            const createIndex = createIndexFactory(this.indexManager);

            for (const { index, settings } of indexes) {
                try {
                    console.log("Creating index", index);
                    await createIndex.createIfNotExists(index, settings);
                } catch (ex) {
                    console.error(`Failed to create index "${index}".`, ex);
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
}
