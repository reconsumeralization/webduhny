import React from "react";
import {
    ListItemText as RmwcListItemText,
    ListItemPrimaryText as RmwcListItemPrimaryText,
    ListItemSecondaryText as RmwcListItemSecondaryText
} from "@rmwc/list";
import { Typography } from "~/Typography";

/** Text Wrapper for the ListItem */
export type ListItemTextProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

/**
 * Used to show regular text in list items.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListItemText = (props: ListItemTextProps) => {
    return <RmwcListItemText {...props}>{props.children}</RmwcListItemText>;
};

export type ListItemTextPrimaryProps = {
    /**
     * Text content
     */
    children: React.ReactNode;
};

export const ListItemTextPrimary = (props: ListItemTextPrimaryProps) => {
    return <RmwcListItemPrimaryText>{props.children}</RmwcListItemPrimaryText>;
};

export type ListItemTextSecondaryProps = {
    /**
     * Text content
     */
    children: React.ReactNode;
};

/**
 * Used to show secondary text in list items.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListItemTextSecondary = (props: ListItemTextSecondaryProps) => {
    return <RmwcListItemSecondaryText>{props.children}</RmwcListItemSecondaryText>;
};

export type ListTextOverlineProps = {
    children: React.ReactNode;
};

/**
 * Can be used to show an overline text inside ListItem component.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListTextOverline = (props: ListTextOverlineProps) => {
    return (
        <span {...props} className={"webiny-list-text-overline"}>
            <Typography use="overline">{props.children}</Typography>
        </span>
    );
};
