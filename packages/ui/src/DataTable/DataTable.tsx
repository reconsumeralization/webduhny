import React from "react";
import {
    DataTable as AdminDataTable,
    DataTableDefaultData,
    DataTableProps as AdminDataTableProps
} from "@webiny/admin-ui";

interface DataTableProps<TEntry>
    extends Omit<AdminDataTableProps<TEntry>, "loading" | "stickyHeader"> {
    loadingInitial?: AdminDataTableProps<TEntry>["loading"];
    stickyHeader?: number;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `DataTable` component from the `@webiny/admin-ui` package instead.
 */
export const DataTable = <T extends Record<string, any> & DataTableDefaultData>({
    loadingInitial,
    stickyHeader,
    ...props
}: DataTableProps<T>) => {
    return <AdminDataTable {...props} loading={loadingInitial} stickyHeader={!!stickyHeader} />;
};
