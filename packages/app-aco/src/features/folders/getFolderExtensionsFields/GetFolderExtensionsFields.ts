import type { IGetFolderExtensionsFieldsUseCase } from "./IGetFolderExtensionsFieldsUseCase";
import { GetFolderExtensionsFieldsRepository } from "./GetFolderExtensionsFieldsRepository";

import { GetFolderExtensionsFieldsUseCase } from "./GetFolderExtensionsFieldsUseCase";
import { GetFolderExtensionsFieldsUseCaseWithNamespace } from "./GetFolderExtensionsFieldsUseCaseWithNamespace";
import { GetFolderExtensionsFieldsUseCaseWithNamespaceAndModelId } from "./GetFolderExtensionsFieldsUseCaseWithNamespaceAndModelId";
import type { CmsModel } from "@webiny/app-headless-cms-common/types";

export class GetFolderExtensionsFields {
    public static getInstance(
        folderModel: CmsModel,
        folderType: string,
        modelId: string
    ): IGetFolderExtensionsFieldsUseCase {
        const repository = new GetFolderExtensionsFieldsRepository(folderModel);
        const useCase = new GetFolderExtensionsFieldsUseCase(repository);

        switch (folderType) {
            case "cms":
                return new GetFolderExtensionsFieldsUseCaseWithNamespaceAndModelId(
                    "cms",
                    modelId,
                    useCase
                );

            case "PbPage":
                return new GetFolderExtensionsFieldsUseCaseWithNamespace("pb_page", useCase);

            case "FmFile":
                return new GetFolderExtensionsFieldsUseCaseWithNamespace("fm_file", useCase);

            default:
                return new GetFolderExtensionsFieldsUseCaseWithNamespace("global", useCase);
        }
    }
}
