import React, { useContext, useEffect } from "react";
import { DeprecatedListItemContext } from "~/List";

/** Text Wrapper for the ListItem */
export type ListItemTextProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `ListItem` component props from the `@webiny/admin-ui` package instead.
 */
export const ListItemText = (props: ListItemTextProps) => {
    const listItemContext = useContext(DeprecatedListItemContext);

    useEffect(() => {
        props.onClick && listItemContext!.addOnClickCallback(props.onClick);
    }, [props]);

    return props.children;
};

export type ListItemTextPrimaryProps = {
    /**
     * Text content
     */
    children: React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `ListItem` component props from the `@webiny/admin-ui` package instead.
 */
export const ListItemTextPrimary = (props: ListItemTextPrimaryProps) => {
    const listItemContext = useContext(DeprecatedListItemContext);

    useEffect(() => {
        listItemContext!.addTitle(props.children);
    }, [props]);

    return null;
};

export type ListItemTextSecondaryProps = {
    /**
     * Text content
     */
    children: React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `ListItem` component props from the `@webiny/admin-ui` package instead.
 */
export const ListItemTextSecondary = (props: ListItemTextSecondaryProps) => {
    const listItemContext = useContext(DeprecatedListItemContext);

    useEffect(() => {
        listItemContext!.addDescription(props.children);
    }, [props]);

    return null;
};

export type ListTextOverlineProps = {
    children: React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `ListItem` component props from the `@webiny/admin-ui` package instead.
 */
export const ListTextOverline = (props: ListTextOverlineProps) => {
    const listItemContext = useContext(DeprecatedListItemContext);

    useEffect(() => {
        listItemContext!.addDescription(props.children);
    }, [props]);

    return null;
};
