import type { IRecordsDataDeployment } from "./RecordsDataDeployment.js";
import { convertException } from "@webiny/utils/exception.js";
import type { ISystem } from "~/sync/types.js";
import type { IDetail } from "~/sync/handler/types.js";

export interface IRecordsDataDeploymentCreateRecordsDataDeploymentCallable {
    (name: string): IRecordsDataDeployment;
}

export interface IRecordsDataParams {
    createRecordsDataDeployment: IRecordsDataDeploymentCreateRecordsDataDeploymentCallable;
}

export interface IRecordsDataIngestRecordBody {
    detail: IDetail;
}

export interface IRecordsDataIngestRecord {
    body: IRecordsDataIngestRecordBody;
}

export interface IRecordsDataIngestParams {
    records: IRecordsDataIngestRecord[];
}

export interface IRecordsData {
    getDeployments(): IRecordsDataDeployment[];
    ingest(params: IRecordsDataIngestParams): Promise<void>;
}

export class RecordsData implements IRecordsData {
    private readonly data: IRecordsDataDeployment[] = [];

    private readonly createRecordsDataDeployment: IRecordsDataDeploymentCreateRecordsDataDeploymentCallable;

    public constructor(params: IRecordsDataParams) {
        this.createRecordsDataDeployment = params.createRecordsDataDeployment;
    }

    public async ingest(params: IRecordsDataIngestParams): Promise<void> {
        const { records } = params;
        /**
         * We need to go through all the records and find the deployment it belongs to.
         * If no deployment is found, we skip the record - but leave the log.
         *
         * We need to split the records by deployment because we will need to do transforms on the records, and we need to know which deployment the record was sent from.
         */
        for (const record of records) {
            const source = record.body.detail.source;
            const deployment = this.getDeployment(source);
            if (!deployment) {
                console.error(
                    `Deployment not found for source "${source.name}". More info in next log.`
                );
                console.log(JSON.stringify(source));
                continue;
            }
            await deployment.ingest({
                items: record.body.detail.items
            });
        }
    }

    public getDeployments(): IRecordsDataDeployment[] {
        return this.data;
    }

    private getDeployment(system: ISystem): IRecordsDataDeployment | null {
        const existingDeployment = this.data.find(item => item.deployment.name === system.name);
        if (existingDeployment) {
            return existingDeployment;
        }

        try {
            const newDeployment = this.createRecordsDataDeployment(system.name);
            this.data.push(newDeployment);
            return newDeployment;
        } catch (ex) {
            console.error("Error while creating system out of deployments.");
            console.log(convertException(ex));
        }
        return null;
    }
}

export const createRecordsData = (params: IRecordsDataParams): IRecordsData => {
    return new RecordsData(params);
};
