import { PbContext } from "~/types";
import { GetModel } from "~/translations/GetModel";
import { TranslatedCollectionDTO } from "~/translations/translatedCollection/repository/mappers/TranslatedCollectionDTO";

export interface DeleteTranslatedCollectionParams {
    collectionId: string;
    languageCode?: string;
}

export class DeleteTranslatedCollectionRepository {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(params: DeleteTranslatedCollectionParams): Promise<void> {
        const model = await GetModel.byModelId(this.context, "translatedCollection");

        const filter: DeleteTranslatedCollectionParams = {
            collectionId: params.collectionId
        };

        if (params.languageCode) {
            filter.languageCode = params.languageCode;
        }

        const [entries] = await this.context.cms.listEntries<TranslatedCollectionDTO>(model, {
            where: { latest: true, ...filter }
        });

        await Promise.all(
            entries.map(entry => {
                return this.context.cms.deleteEntry(model, entry.entryId, {
                    permanently: true
                });
            })
        );
    }
}
