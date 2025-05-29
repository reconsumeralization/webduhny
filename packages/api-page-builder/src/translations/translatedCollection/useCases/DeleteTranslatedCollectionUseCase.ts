import { PbContext } from "~/graphql/types";
import { DeleteTranslatedCollectionRepository } from "~/translations/translatedCollection/repository/DeleteTranslatedCollectionRepository";

export interface DeleteTranslatedCollectionParams {
    collectionId: string;
    languageCode?: string;
}

export class DeleteTranslatedCollectionUseCase {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(params: DeleteTranslatedCollectionParams): Promise<void> {
        const deleteRepository = new DeleteTranslatedCollectionRepository(this.context);

        await deleteRepository.execute(params);
    }
}
