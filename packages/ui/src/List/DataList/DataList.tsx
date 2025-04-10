import React from "react";
import { DataList as AdminDatalist, List } from "@webiny/admin-ui";
import { ListProps, ListItemProps } from "../List";
import { DataListProps } from "@webiny/admin-ui/DataList/types";

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `DataList` component from the `@webiny/admin-ui` package instead.
 */
export const DataList = (props: DataListProps<Record<string, any>>) => {
    return <AdminDatalist {...props} />;
};

export interface ScrollListProps extends ListProps {
    children: React.ReactElement<ListItemProps>[];
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `List` component from the `@webiny/admin-ui` package instead.
 */
export const ScrollList = (props: ScrollListProps) => {
    return <List {...props} />;
};
