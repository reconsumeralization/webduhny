import type { CommandType } from "~/types.js";

export interface IRecordsDataDeploymentTableItem {
    PK: string;
    SK: string;
    command: CommandType;
}

export interface IRecordsDataDeploymentTableItemParams {
    PK: string;
    SK: string;
    command: CommandType;
}

export class RecordsDataDeploymentTableItem implements IRecordsDataDeploymentTableItem {
    public readonly PK: string;
    public readonly SK: string;
    public readonly command: CommandType;

    public constructor(params: IRecordsDataDeploymentTableItemParams) {
        this.PK = params.PK;
        this.SK = params.SK;
        this.command = params.command;
    }
}

export const createRecordsDataDeploymentTableItem = (
    params: IRecordsDataDeploymentTableItemParams
): IRecordsDataDeploymentTableItem => {
    return new RecordsDataDeploymentTableItem(params);
};
