import { createFolderFieldDecoratorFactory } from "@webiny/app-aco";
import { BulkAction, BulkActionConfig } from "./BulkAction";
import { FolderAction, FolderActionConfig } from "./FolderAction";
import { PageAction, PageActionConfig } from "./PageAction";
import { Table, TableConfig } from "./Table";
import { shouldDecorateFolderField } from "./FolderFieldDecorator";

export interface BrowserConfig {
    bulkActions: BulkActionConfig[];
    folderActions: FolderActionConfig[];
    pageActions: PageActionConfig[];
    table: TableConfig;
}

export const Browser = {
    BulkAction,
    PageAction,
    Table,
    Folder: {
        ExtensionField: {
            createDecorator: createFolderFieldDecoratorFactory({
                scope: "pb.page",
                shouldDecorate: shouldDecorateFolderField
            })
        },
        Action: FolderAction
    },
    /**
     * @deprecated
     * Use `Browser.Folder.Action` instead
     */
    FolderAction
};
