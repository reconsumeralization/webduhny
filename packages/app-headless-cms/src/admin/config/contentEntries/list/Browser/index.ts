import { createFolderFieldDecoratorFactory } from "@webiny/app-aco";
import { AdvancedSearch, AdvancedSearchConfig } from "./AdvancedSearch";
import { BulkAction, BulkActionConfig } from "./BulkAction";
import { EntryAction, EntryActionConfig } from "./EntryAction";
import { Filter, FilterConfig } from "./Filter";
import { FiltersToWhere, FiltersToWhereConverter } from "./FiltersToWhere";
import { FolderAction, FolderActionConfig } from "./FolderAction";
import { Table, TableConfig } from "./Table";
import { shouldDecorateFolderField } from "./FolderFieldDecorator";

export interface BrowserConfig {
    advancedSearch: AdvancedSearchConfig;
    bulkActions: BulkActionConfig[];
    entryActions: EntryActionConfig[];
    filters: FilterConfig[];
    filtersToWhere: FiltersToWhereConverter[];
    folderActions: FolderActionConfig[];
    table: TableConfig;
}

export const Browser = {
    AdvancedSearch,
    BulkAction,
    EntryAction,
    Filter,
    FiltersToWhere,
    Folder: {
        ExtensionField: {
            createDecorator: createFolderFieldDecoratorFactory({
                scope: "cms",
                shouldDecorate: shouldDecorateFolderField
            })
        },
        Action: FolderAction
    },
    Table,
    /**
     * @deprecated
     * Use `Browser.Folder.Action` instead
     */
    FolderAction
};
