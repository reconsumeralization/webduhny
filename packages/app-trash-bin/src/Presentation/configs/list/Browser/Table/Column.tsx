import React from "react";
import { AcoConfig, TableColumnConfig as ColumnConfig } from "@webiny/app-aco";
import { TrashBinItemDTO } from "~/Domain";

const { Table } = AcoConfig;

export { ColumnConfig };

type ColumnProps = React.ComponentProps<typeof AcoConfig.Table.Column>;

const BaseColumn = (props: ColumnProps) => {
    return (
        <AcoConfig>
            <Table.Column {...props} />
        </AcoConfig>
    );
};

export const Column = Object.assign(BaseColumn, {
    useTableRow: Table.Column.createUseTableRow<TrashBinItemDTO>(),
    isFolderRow: Table.Column.isFolderRow
});
