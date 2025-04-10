import { CmsModelField } from "@webiny/app-headless-cms-common/types";

export interface IGetFolderExtensionsFieldsRepository {
    execute: () => CmsModelField | undefined;
}
