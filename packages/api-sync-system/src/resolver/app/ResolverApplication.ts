import type {
    IResolverApplication,
    IResolverApplicationResolveParams
} from "./abstractions/ResolverApplication.js";
import { createRecordsValidation } from "./RecordsValidation.js";
import { convertException } from "@webiny/utils";
import type { IRecordHandler } from "./abstractions/RecordHandler.js";
import { createRecordsData } from "~/resolver/app/data/RecordsData.js";
import { createRecordsDataDeployment } from "~/resolver/app/data/RecordsDataDeployment.js";
import { createRecordsDataDeploymentTable } from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import { createRecordsDataDeploymentTableItem } from "~/resolver/app/data/RecordsDataDeploymentTableItem.js";
import type { IDeployments } from "~/resolver/deployment/types.js";

export interface IResolverApplicationParams {
    recordHandler: IRecordHandler;
    deployments: IDeployments;
}

export class ResolverApplication implements IResolverApplication {
    private readonly recordHandler: IRecordHandler;
    private readonly deployments: IDeployments;

    public constructor(params: IResolverApplicationParams) {
        this.recordHandler = params.recordHandler;
        this.deployments = params.deployments;
    }

    public async resolve(params: IResolverApplicationResolveParams): Promise<void> {
        const validation = createRecordsValidation();

        const result = await validation.validate(params.records);
        if (result.error) {
            throw result.error;
        }

        /**
         * If needed, we can pass down system and table objects all the way to the item.
         * TODO - determine if required - possibly for modifications?
         */
        const data = createRecordsData({
            createRecordsDataDeployment: name => {
                const deployment = this.deployments.get(name);
                if (!deployment) {
                    throw new Error(`Deployment "${name}" not found.`);
                }
                return createRecordsDataDeployment({
                    deployment,
                    createRecordsDataDeploymentTable: ({ tableName }) => {
                        return createRecordsDataDeploymentTable({
                            name: tableName,
                            createRecordsDataDeploymentTableItem: ({ item }) => {
                                return createRecordsDataDeploymentTableItem(item);
                            }
                        });
                    }
                });
            }
        });

        await data.ingest({
            records: result.records
        });

        try {
            await this.recordHandler.handle({
                data
            });
        } catch (ex) {
            console.error(convertException(ex));
        }
    }
}

export const createResolverApp = (params: IResolverApplicationParams): IResolverApplication => {
    return new ResolverApplication(params);
};
