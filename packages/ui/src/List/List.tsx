import React from "react";
import {
    List as RmwcList,
    ListItem as RmwcListItem,
    ListItemText as RmwcListItemText,
    ListItemPrimaryText as RmwcListItemPrimaryText,
    ListItemSecondaryText as RmwcListItemSecondaryText,
    SimpleListItem as RmwcSimpleListItem
} from "@rmwc/list";
import { Typography } from "~/Typography";
import classNames from "classnames";
import { SelectBoxWrapper, webinyList } from "./styled";

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
    return <RmwcListItem {...props} />;
};

/** A List Component */
export type ListProps = {
    /** Reduces the padding on List items. */
    dense?: boolean;
    /** Gives more space for dual lined list items. */
    twoLine?: boolean;
    /** Makes the list start detail circular for avatars. */
    avatarList?: boolean;
    /** Makes the list non interactive. In addition, you'll have to set `ripple={false}` on the individual ListItems. */
    nonInteractive?: boolean;
    /** A callback for when a list item is interacted with. evt.detail = number */
    onAction?: (evt: CustomEvent<{ index: number }> & React.SyntheticEvent<EventTarget>) => void;
    /** An internal api used for cross component communication */
    apiRef?: (api: ListApi | null) => void;
    /** Advanced: A reference to the MDCFoundation. */
    foundationRef?: any;
    /** Sets the list to allow the up arrow on the first element to focus the
     * last element of the list and vice versa. Defaults to true */
    wrapFocus?: boolean;
    /** Sets the lists vertical orientation. Defaults to true */
    vertical?: boolean;
    /** Sets the selectedIndex for singleSelection, radiogroup, or checkboxlist variants. Only supply number[] to checkboxlists */
    selectedIndex?: number[] | number;

    /** Custom */
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent) => void;
};

export interface ListApi {
    listElements: () => HTMLLIElement[];
    focusRoot: () => void;
    getClasses: () => string;
    addClassToElementIndex: (index: number, className: string) => void;
    removeClassFromElementAtIndex: (index: number, className: string) => void;
    setAttributeForElementIndex: (index: number, attr: string, value: any) => void;
    getListItemCount: () => number;
    focusItemAtIndex: (index: number) => void;
    selectedIndex: number | number[];
    setSelectedIndex: (index: number) => void;
}

/**
 * Use List component to display data and offer additional actions if needed.
 */
export class List extends React.Component<ListProps> {
    public override render() {
        return (
            <RmwcList {...this.props} className={classNames(webinyList, this.props.className)}>
                {this.props.children}
            </RmwcList>
        );
    }
}

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

export type ListItemGraphicProps = { children: React.ReactNode; className?: string };

/**
 * Can be used to show an icon or any other custom element. Rendered on the left side.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListItemGraphic = (props: ListItemGraphicProps) => {
    return (
        <div
            {...props}
            className={classNames("mdc-deprecated-list-item__graphic", props.className)}
        >
            {props.children}
        </div>
    );
};

export type ListItemMetaProps = { children: React.ReactNode; className?: string };

/**
 * Can be used to show an icon or any other custom element. Rendered on the right side.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListItemMeta = (props: ListItemMetaProps) => {
    return (
        <span {...props} className={classNames("mdc-deprecated-list-item__meta", props.className)}>
            {props.children}
        </span>
    );
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

export type ListActionsProps = {
    children: React.ReactNode;
};

/**
 * Used to contain the actions inside ListItemMate component.
 * @param props
 * @returns {*}
 * @constructor
 */
export const ListActions = (props: ListActionsProps) => {
    return (
        <span {...props} className={"webiny-list-actions"}>
            {props.children}
        </span>
    );
};

export type ListSelectBoxProps = {
    children: React.ReactNode;
};

/**
 * Used to hold the Checkbox element for multi-select options.
 * @param {*} props
 */
export const ListSelectBox = (props: ListSelectBoxProps) => {
    return (
        <ListItemGraphic>
            <SelectBoxWrapper>{props.children}</SelectBoxWrapper>
        </ListItemGraphic>
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

export const SimpleListItem = (props: SimpleListItemProps) => {
    return <RmwcSimpleListItem {...props} />;
};
