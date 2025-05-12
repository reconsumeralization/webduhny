import { createContextPlugin } from "@webiny/api-serverless-cms";
import { PageDataIntegrityValidator } from "../../shared/PageDataIntegrityValidator";
import { PbPage } from "../../shared/types";

export const validatePageDataIntegrity = () => {
    return createContextPlugin(ctx => {
        ctx.pageBuilder.onPageBeforeUpdate.subscribe(async ({ page }) => {
            // @ts-ignore Incompatible types. Safe to ignore.
            PageDataIntegrityValidator.ensureValid(page as PbPage);
        });
    });
};
