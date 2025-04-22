import type {
    IResolverApplication,
    IResolverApplicationResolveParams
} from "./abstractions/ResolverApplication.js";
import { createRecordsValidation } from "./RecordsValidation.js";
import { convertException } from "@webiny/utils";
import type { IRecordHandler } from "./abstractions/RecordHandler.js";
import { createRecordsData } from "~/resolver/app/data/RecordsData.js";
import { createRecordsDataSystem } from "~/resolver/app/data/RecordsDataSystem.js";
import { createRecordsDataSystemTable } from "~/resolver/app/data/RecordsDataSystemTable.js";
import { createRecordsDataSystemTableItem } from "~/resolver/app/data/RecordsDataSystemTableItem.js";

export interface IResolverApplicationParams {
    recordHandler: IRecordHandler;
}

export class ResolverApplication implements IResolverApplication {
    private readonly recordHandler: IRecordHandler;

    public constructor(params: IResolverApplicationParams) {
        this.recordHandler = params.recordHandler;
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
            createRecordsDataSystem: system => {
                return createRecordsDataSystem({
                    system,
                    createRecordsDataSystemTable: ({ tableName }) => {
                        return createRecordsDataSystemTable({
                            name: tableName,
                            createRecordsDataSystemTableItem: ({ item }) => {
                                return createRecordsDataSystemTableItem(item);
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
