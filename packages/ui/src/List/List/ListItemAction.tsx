import React, { useContext, useEffect } from "react";
import { DeprecatedListItemContext } from "~/List";

export type ListActionsProps = {
    children: React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `ListItem` component props from the `@webiny/admin-ui` package instead.
 */
export const ListActions = (props: ListActionsProps) => {
    const listItemContext = useContext(DeprecatedListItemContext);

    useEffect(() => {
        listItemContext!.addActions(props.children);
    }, [props]);

    return null;
};
