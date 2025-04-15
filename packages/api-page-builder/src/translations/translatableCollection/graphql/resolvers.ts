import { ErrorResponse, Response } from "@webiny/handler-graphql";
import type { Resolvers } from "@webiny/handler-graphql/types";
import type { PbContext } from "~/graphql/types";
import { SaveTranslatableCollectionUseCase } from "~/translations/translatableCollection/useCases/SaveTranslatableCollectionUseCase";
import type { GqlTranslatableItemDTO } from "~/translations/translatableCollection/graphql/GqlTranslatableItemDTO";
import { GetTranslatableCollectionByIdRepository } from "~/translations/translatableCollection/repository/GetTranslatableCollectionByIdRepository";
import { GqlTranslatableCollectionMapper } from "~/translations/translatableCollection/graphql/GqlTranslatableCollectionMapper";
import { DeleteTranslatableCollectionUseCase } from "~/translations";

interface UpdateTranslatableCollectionParams {
    collectionId: string;
    items: GqlTranslatableItemDTO[];
}

interface DeleteTranslatableCollectionParams {
    collectionId: string;
}

export const translatableCollectionResolvers: Resolvers<PbContext> = {
    TranslationsQuery: {
        getTranslatableCollection: async (_, args, context) => {
            try {
                const getById = new GetTranslatableCollectionByIdRepository(context);
                const collection = await getById.execute(args.collectionId);

                return new Response(GqlTranslatableCollectionMapper.toDTO(collection));
            } catch (err) {
                return new ErrorResponse(err);
            }
        }
    },
    TranslationsMutation: {
        saveTranslatableCollection: async (_, args, context) => {
            const { collectionId, items } = args as UpdateTranslatableCollectionParams;

            try {
                const useCase = new SaveTranslatableCollectionUseCase(context);
                const collection = await useCase.execute({
                    collectionId,
                    items
                });

                return new Response(GqlTranslatableCollectionMapper.toDTO(collection));
            } catch (err) {
                return new ErrorResponse(err);
            }
        },
        deleteTranslatableCollection: async (_, args, context) => {
            const { collectionId } = args as DeleteTranslatableCollectionParams;

            try {
                const useCase = new DeleteTranslatableCollectionUseCase(context);
                await useCase.execute({ collectionId });

                return new Response(true);
            } catch (err) {
                return new ErrorResponse(err);
            }
        }
    }
};
