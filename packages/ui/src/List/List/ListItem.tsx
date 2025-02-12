import React from "react";
import { List as AdminList } from "@webiny/admin-ui";

/**
 * Ripples
 */
export declare type RipplePropT =
    | boolean
    | {
          accent?: boolean;
          surface?: boolean;
          unbounded?: boolean;
      };

/** A ListItem component. */
export type ListItemProps = {
    /** A modifier for a selected state. */
    selected?: boolean;
    /** A modifier for an active state. */
    activated?: boolean;
    /** A modifier for a disabled state. */
    disabled?: boolean;
    /** Adds a ripple effect to the component */
    ripple?: RipplePropT;

    /** Custom */
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent) => void;
};

/**
 * ListItem components are placed as direct children to List component.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListItem = (props: ListItemProps) => {
    return (
        <AdminList.Item
            disabled={props.disabled}
            onClick={props.onClick}
            className={props.className}
            style={props.style}
            title={props.children}
        >
            {props.children}
        </AdminList.Item>
    );
};

/** A simple list item template. */
export interface SimpleListItemProps extends ListItemProps {
    /** Text for the ListItem. */
    text?: React.ReactNode;
    /** Secondary Text for the ListItem. */
    secondaryText?: React.ReactNode;
    /** A graphic icon for the ListItem. */
    graphic?: any;
    /** A meta icon for the ListItem */
    metaIcon?: any;
    /** Meta content for the ListItem instead of an icon. */
    meta?: React.ReactNode;
    /** Children to render */
    children: React.ReactNode;

    /** Custom */
    onClick?: any;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `List.Item` component from the `@webiny/admin-ui` package instead.
 */
export const SimpleListItem = (props: SimpleListItemProps) => {
    return (
        <AdminList.Item
            title={props.text}
            description={props.secondaryText}
            icon={props.graphic}
            actions={props.meta ?? props.metaIcon}
            onClick={props.onClick}
        />
    );
};
