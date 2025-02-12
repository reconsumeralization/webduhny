import React from "react";

export type ListItemMetaProps = { children: React.ReactNode; className?: string };

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `ListItem` component props from the `@webiny/admin-ui` package instead.
 */
export const ListItemMeta = (props: ListItemMetaProps) => {
    return <span {...props}>{props.children}</span>;
};

export type ListTopCaptionProps = {
    children: React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `ListItem` component props from the `@webiny/admin-ui` package instead.
 */
export const ListTopCaption = ({}: ListTopCaptionProps) => {
    return null;
};

export type ListBottomCaptionProps = {
    children: React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `ListItem` component props from the `@webiny/admin-ui` package instead.
 */
export const ListBottomCaption = ({}: ListBottomCaptionProps) => {
    return null;
};
