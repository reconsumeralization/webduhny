import type { IRecordsDataDeploymentTableItem } from "./RecordsDataDeploymentTableItem.js";
import type { CommandType } from "~/types.js";

export interface IRecordsDataDeploymentTableBundle {
    items: IRecordsDataDeploymentTableItem[];
    command: CommandType;
}

export interface IRecordsDataDeploymentTable {
    name: string;
    add(item: IRecordsDataDeploymentTableItem): void;
    getItems(): IRecordsDataDeploymentTableItem[];
    /**
     * Method that will bundle all items by command type.
     * We need to keep the order of the operations as they are received.
     * So there might be few bundles:
     * * put - 10 operations
     * * delete - 1 operation
     * * put - 5 operations
     * ...etc
     */
    bundle(): IRecordsDataDeploymentTableBundle[];
}

export interface ICreateRecordsDataDeploymentTableParamsCallableParams {
    item: IRecordsDataDeploymentTableItem;
}

export interface ICreateRecordsDataDeploymentTableParamsCallable {
    (
        params: ICreateRecordsDataDeploymentTableParamsCallableParams
    ): IRecordsDataDeploymentTableItem;
}

export interface IRecordsDataDeploymentTableParams {
    name: string;
    createRecordsDataDeploymentTableItem: ICreateRecordsDataDeploymentTableParamsCallable;
}

export class RecordsDataDeploymentTable implements IRecordsDataDeploymentTable {
    public readonly name: string;

    private readonly createRecordsDataDeploymentTableItem: ICreateRecordsDataDeploymentTableParamsCallable;
    private readonly items: IRecordsDataDeploymentTableItem[] = [];

    public constructor(params: IRecordsDataDeploymentTableParams) {
        this.name = params.name;
        this.createRecordsDataDeploymentTableItem = params.createRecordsDataDeploymentTableItem;
    }

    public getItems(): IRecordsDataDeploymentTableItem[] {
        return this.items;
    }

    public add(item: IRecordsDataDeploymentTableItem): void {
        this.items.push(this.createRecordsDataDeploymentTableItem({ item }));
    }

    public bundle(): IRecordsDataDeploymentTableBundle[] {
        const bundles: IRecordsDataDeploymentTableBundle[] = [];
        let bundle: IRecordsDataDeploymentTableBundle | null = null;
        for (const item of this.items) {
            if (!bundle) {
                bundle = this.createBundle(item);
                bundles.push(bundle);
                continue;
            } else if (bundle.command !== item.command) {
                bundle = this.createBundle(item);
                bundles.push(bundle);
                continue;
            }
            bundle.items.push(item);
        }

        return bundles;
    }

    private createBundle(item: IRecordsDataDeploymentTableItem): IRecordsDataDeploymentTableBundle {
        return {
            items: [item],
            command: item.command
        };
    }
}

export const createRecordsDataDeploymentTable = (
    params: IRecordsDataDeploymentTableParams
): IRecordsDataDeploymentTable => {
    return new RecordsDataDeploymentTable(params);
};
