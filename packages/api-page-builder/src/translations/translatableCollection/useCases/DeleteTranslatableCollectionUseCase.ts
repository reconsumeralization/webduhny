import { PbContext } from "~/graphql/types";
import { DeleteTranslatableCollectionRepository } from "~/translations/translatableCollection/repository/DeleteTranslatableCollectionRepository";

export interface DeleteTranslatableCollectionParams {
    collectionId: string;
}

export class DeleteTranslatableCollectionUseCase {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(params: DeleteTranslatableCollectionParams): Promise<void> {
        const deleteRepository = new DeleteTranslatableCollectionRepository(this.context);

        await deleteRepository.execute(params.collectionId);
    }
}
