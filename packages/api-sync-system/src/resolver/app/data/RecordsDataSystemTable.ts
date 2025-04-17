import type { IRecordsDataSystemTableItem } from "./RecordsDataSystemTableItem.js";

export interface IRecordsDataSystemTable {
    name: string;
    add(item: IRecordsDataSystemTableItem): void;
    getItems(): IRecordsDataSystemTableItem[];
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
}

export const createRecordsDataSystemTable = (
    params: IRecordsDataSystemTableParams
): IRecordsDataSystemTable => {
    return new RecordsDataSystemTable(params);
};
