import { createContextPlugin } from "@webiny/api-serverless-cms";
import { createInitialPageContent } from "./backend/api/createInitialPageContent";

export const createExtension = () => {
    return [
        createContextPlugin(ctx => {
            ctx.pageBuilder.onPageBeforeCreate.subscribe(async ({ page }) => {
                // Ensure funnel builder is immediately added to the page content.
                page.content = createInitialPageContent();
            });
        })
    ];
};
