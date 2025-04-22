import type { IRecordsDataSystemTableItem } from "./RecordsDataSystemTableItem.js";
import type { CommandType } from "~/types.js";

export interface IRecordsDataSystemTableBundle {
    items: IRecordsDataSystemTableItem[];
    command: CommandType;
}

export interface IRecordsDataSystemTable {
    name: string;
    add(item: IRecordsDataSystemTableItem): void;
    getItems(): IRecordsDataSystemTableItem[];
    /**
     * Method that will bundle all items by command type.
     * We need to keep the order of the operations as they are received.
     * So there might be few bundles:
     * * put - 10 operations
     * * delete - 1 operation
     * * put - 5 operations
     * ...etc
     */
    bundle(): IRecordsDataSystemTableBundle[];
}

export interface ICreateRecordsDataSystemTableParamsCallableParams {
    item: IRecordsDataSystemTableItem;
}

export interface ICreateRecordsDataSystemTableParamsCallable {
    (params: ICreateRecordsDataSystemTableParamsCallableParams): IRecordsDataSystemTableItem;
}

export interface IRecordsDataSystemTableParams {
    name: string;
    createRecordsDataSystemTableItem: ICreateRecordsDataSystemTableParamsCallable;
}

export class RecordsDataSystemTable implements IRecordsDataSystemTable {
    public readonly name: string;

    private readonly createRecordsDataSystemTableItem: ICreateRecordsDataSystemTableParamsCallable;
    private readonly items: IRecordsDataSystemTableItem[] = [];

    public constructor(params: IRecordsDataSystemTableParams) {
        this.name = params.name;
        this.createRecordsDataSystemTableItem = params.createRecordsDataSystemTableItem;
    }

    public getItems(): IRecordsDataSystemTableItem[] {
        return this.items;
    }

    public add(item: IRecordsDataSystemTableItem): void {
        this.items.push(this.createRecordsDataSystemTableItem({ item }));
    }

    public bundle(): IRecordsDataSystemTableBundle[] {
        const bundles: IRecordsDataSystemTableBundle[] = [];
        let bundle: IRecordsDataSystemTableBundle | null = null;
        for (const item of this.items) {
            if (!bundle) {
                bundle = this.createBundle(item);
                continue;
            } else if (bundle.command !== item.command) {
                bundles.push(structuredClone(bundle));
                bundle = this.createBundle(item);
                continue;
            }
            bundle.items.push(structuredClone(item));
        }

        return bundles;
    }

    private createBundle(item: IRecordsDataSystemTableItem): IRecordsDataSystemTableBundle {
        return {
            items: [item],
            command: item.command
        };
    }
}

export const createRecordsDataSystemTable = (
    params: IRecordsDataSystemTableParams
): IRecordsDataSystemTable => {
    return new RecordsDataSystemTable(params);
};
