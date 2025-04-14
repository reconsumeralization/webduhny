import React from "react";
import { DataListWithSections as AdminDataListWithSections, List } from "@webiny/admin-ui";
import { ListProps } from "../List";
import { DataListProps } from "@webiny/admin-ui/DataList/types";
import { ListItem } from "@webiny/admin-ui/List/components";

interface DataListData {
    [key: string]: Record<string, any>[];
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `DataList` component from the `@webiny/admin-ui` package instead.
 */
export const DataListWithSections = (props: DataListProps<DataListData>) => {
    return <AdminDataListWithSections {...props} />;
};

interface ScrollListWithSectionsProps extends ListProps {
    children: React.ReactElement<typeof ListItem>[];
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `List` component from the `@webiny/admin-ui` package instead.
 */
export const ScrollListWithSections = (props: ScrollListWithSectionsProps) => {
    return <List {...props} />;
};
