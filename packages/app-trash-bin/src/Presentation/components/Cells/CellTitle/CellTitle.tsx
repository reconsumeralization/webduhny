import React from "react";
import { ReactComponent as File } from "@webiny/icons/description.svg";
import { TrashBinListConfig } from "~/Presentation/configs";
import { Icon, Text } from "@webiny/admin-ui";

export const CellTitle = () => {
    const { useTableRow } = TrashBinListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    return (
        <div className={"wby-flex wby-items-center wby-gap-sm wby-truncate"}>
            <Icon size={"sm"} color={"neutral-strong"} icon={<File />} label={"Item"} />
            <Text className={"wby-truncate wby-min-w-0 wby-flex-shrink"}>{row.title}</Text>
        </div>
    );
};
