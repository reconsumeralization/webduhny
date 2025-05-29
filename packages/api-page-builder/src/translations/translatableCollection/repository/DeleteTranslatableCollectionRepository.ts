import { PbContext } from "~/types";
import { GetModel } from "~/translations/GetModel";
import { TranslatableCollectionDTO } from "./mappers/TranslatableCollectionDTO";

export class DeleteTranslatableCollectionRepository {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(collectionId: string): Promise<void> {
        const model = await GetModel.byModelId(this.context, "translatableCollection");

        // `cms.getEntry` throws an error if an entry is not found.
        try {
            const existingEntry = await this.context.cms.getEntry<TranslatableCollectionDTO>(
                model,
                {
                    where: { collectionId, latest: true }
                }
            );

            await this.context.cms.deleteEntry(model, existingEntry.entryId, { permanently: true });
        } catch {
            // If a record doesn't exist, then there's nothing to delete, and we can exit.
            console.log(
                `[DeleteTranslatableCollectionRepository]: Collection doesn't exist: ${collectionId}`
            );
        }
    }
}
