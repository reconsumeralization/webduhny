export interface IRecordsDataSystemTableItem {
    PK: string;
    SK: string;
    command: "put" | "delete";
}

export interface IRecordsDataSystemTableItemParams {
    PK: string;
    SK: string;
    command: "put" | "delete";
}

export class RecordsDataSystemTableItem implements IRecordsDataSystemTableItem {
    public readonly PK: string;
    public readonly SK: string;
    public readonly command: "put" | "delete";

    public constructor(params: IRecordsDataSystemTableItemParams) {
        this.PK = params.PK;
        this.SK = params.SK;
        this.command = params.command;
    }
}

export const createRecordsDataSystemTableItem = (
    params: IRecordsDataSystemTableItemParams
): IRecordsDataSystemTableItem => {
    return new RecordsDataSystemTableItem(params);
};
