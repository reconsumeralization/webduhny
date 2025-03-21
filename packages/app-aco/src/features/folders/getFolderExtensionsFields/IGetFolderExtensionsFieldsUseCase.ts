import { CmsModelField } from "@webiny/app-headless-cms-common/types";

export interface IGetFolderExtensionsFieldsUseCase {
    execute: () => {
        fields: CmsModelField[];
    };
}
