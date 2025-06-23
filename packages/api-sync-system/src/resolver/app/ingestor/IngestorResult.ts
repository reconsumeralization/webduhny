import type { IIngestorResult, IIngestorResultAddParams, IIngestorResultItem } from "./types.js";
import type { ITable } from "~/sync/types.js";

export class IngestorResult implements IIngestorResult {
    private readonly items: IIngestorResultItem[] = [];

    public add(params: IIngestorResultAddParams): void {
        const { item, source } = params;
        let table: ITable;
        try {
            table = source.getTable(item.tableType);
        } catch (ex) {
            console.error(
                `Could not find table for SQS Record source: ${item.tableName} / ${item.tableType}. More info in next log line.`
            );
            console.log(JSON.stringify(item));
            return;
        }

        this.items.push({
            PK: item.PK,
            SK: item.SK,
            source,
            command: item.command,
            table
        });
    }

    public getItems(): IIngestorResultItem[] {
        return this.items;
    }
}

export const createIngestorResult = (): IIngestorResult => {
    return new IngestorResult();
};
