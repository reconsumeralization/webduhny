import React, { useContext, useEffect } from "react";
import { DeprecatedListItemContext } from "~/List";

export type ListItemGraphicProps = { children: React.ReactNode; className?: string };

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `ListItem` component props from the `@webiny/admin-ui` package instead.
 */
export const ListItemGraphic = (props: ListItemGraphicProps) => {
    const listItemContext = useContext(DeprecatedListItemContext);

    useEffect(() => {
        listItemContext!.addIcon(props.children);
    }, [props]);

    return null;
};

export type ListSelectBoxProps = {
    children: React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `ListItem` component props from the `@webiny/admin-ui` package instead.
 */
export const ListSelectBox = (props: ListSelectBoxProps) => {
    const listItemContext = useContext(DeprecatedListItemContext);

    useEffect(() => {
        listItemContext!.addIcon(props.children);
    }, [props]);

    return null;
};
