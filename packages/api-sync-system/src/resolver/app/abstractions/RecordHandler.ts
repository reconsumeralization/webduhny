import type { IRecordsData } from "~/resolver/app/data/RecordsData.js";

export interface IRecordHandlerHandleParams {
    data: IRecordsData;
}

export interface IRecordHandler {
    handle(params: IRecordHandlerHandleParams): Promise<void>;
}
