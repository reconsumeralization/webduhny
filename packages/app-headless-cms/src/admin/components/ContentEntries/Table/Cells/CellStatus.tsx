import React, { useMemo } from "react";
import { statuses } from "~/admin/constants";
import { ContentEntryListConfig } from "~/admin/config/contentEntries";
import { Tag } from "@webiny/admin-ui";

export const CellStatus = () => {
    const { useTableRow, isFolderRow } = ContentEntryListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <>{"-"}</>;
    }

    const variant = useMemo(() => {
        switch (row.meta.status) {
            case "published":
                return "success";
            case "unpublished":
                return "warning";
            default:
                return "neutral-light";
        }
    }, [row.meta.status]);

    return (
        <Tag
            variant={variant}
            content={`${statuses[row.meta.status]}${
                row.meta.version ? ` (v${row.meta.version})` : ""
            }`}
        />
    );
};
