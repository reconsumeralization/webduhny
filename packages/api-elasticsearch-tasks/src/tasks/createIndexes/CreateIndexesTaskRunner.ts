import { Manager } from "~/tasks/Manager";
import { IndexManager } from "~/settings";
import type { ITaskResponseResult } from "@webiny/tasks";
import type { IElasticsearchCreateIndexesTaskInput } from "./types";
import { listIndexes } from "./listIndexes";
import { createIndexFactory } from "./createIndex";

export class CreateIndexesTaskRunner {
    private readonly manager: Manager<IElasticsearchCreateIndexesTaskInput>;
    private readonly indexManager: IndexManager;

    public constructor(
        manager: Manager<IElasticsearchCreateIndexesTaskInput>,
        indexManager: IndexManager
    ) {
        this.manager = manager;

        this.indexManager = indexManager;
    }

    public async execute(
        matching: string | undefined,
        done: string[]
    ): Promise<ITaskResponseResult> {
        const indexes = await listIndexes({
            context: this.manager.context
        });

        if (indexes.length === 0) {
            return this.manager.response.done("No indexes found.");
        }

        const isIndexAllowed = (index: string): boolean => {
            if (typeof matching !== "string" || !matching) {
                return true;
            }
            return index.includes(matching);
        };

        const createIndex = createIndexFactory(this.indexManager);

        for (const { index, settings } of indexes) {
            if (this.manager.isAborted()) {
                return this.manager.response.aborted();
            } else if (this.manager.isCloseToTimeout()) {
                return this.manager.response.continue({
                    done
                });
            }
            try {
                if (done.includes(index)) {
                    continue;
                } else if (isIndexAllowed(index) === false) {
                    continue;
                }
                const exists = await this.indexManager.indexExists(index);
                if (exists) {
                    continue;
                }
                done.push(index);
                await createIndex.create(index, settings);
                await this.manager.store.addInfoLog({
                    message: `Index "${index}" created.`,
                    data: {
                        index
                    }
                });
            } catch (ex) {
                await this.manager.store.addErrorLog({
                    message: `Failed to create index "${index}".`,
                    error: ex
                });
            }
        }

        return this.manager.response.done("Indexes created.", {
            done
        });
    }
}
