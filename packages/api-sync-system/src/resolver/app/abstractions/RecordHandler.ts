import type { IRecordsData } from "~/resolver/app/data/RecordsData.js";
import type { IStorer } from "~/resolver/app/storer/types.js";
import type { IFetcher } from "~/resolver/app/fetcher/types.js";

export interface IRecordHandlerHandleParams {
    data: IRecordsData;
}

export interface IRecordHandler {
    handle(params: IRecordHandlerHandleParams): Promise<void>;
}
