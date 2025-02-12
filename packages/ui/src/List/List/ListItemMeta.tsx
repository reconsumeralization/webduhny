import React from "react";
import { Typography } from "~/Typography";

export type ListItemMetaProps = { children: React.ReactNode; className?: string };

/**
 * Can be used to show an icon or any other custom element. Rendered on the right side.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListItemMeta = (props: ListItemMetaProps) => {
    return <span {...props}>{props.children}</span>;
};

export type ListTopCaptionProps = {
    children: React.ReactNode;
};

/**
 * Can be used to show a top caption inside ListItemMeta component.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListTopCaption = (props: ListTopCaptionProps) => {
    return (
        <span {...props} className={"webiny-list-top-caption"}>
            <Typography use="overline">{props.children}</Typography>
        </span>
    );
};

export type ListBottomCaptionProps = {
    children: React.ReactNode;
};

/**
 * Can be used to show a bottom caption inside ListItemMeta component.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListBottomCaption = (props: ListBottomCaptionProps) => {
    return (
        <span {...props} className={"webiny-list-bottom-caption"}>
            <Typography use="overline">{props.children}</Typography>
        </span>
    );
};
