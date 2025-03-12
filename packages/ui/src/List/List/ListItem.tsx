import React, { createContext, useMemo, useState } from "react";
import { List as AdminList, ListItemProps as AdminListItemProps } from "@webiny/admin-ui";

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

interface DeprecatedListItemContext {
    addTitle(value: React.ReactNode): void;
    addDescription(value?: React.ReactNode): void;
    addIcon(value: React.ReactNode): void;
    addActions(value?: React.ReactNode): void;
    addOnClickCallback(callback: React.MouseEventHandler<HTMLDivElement>): void;
}

const initializeListItemState = (): AdminListItemProps => {
    return {
        title: undefined,
        description: undefined,
        actions: undefined,
        icon: undefined,
        onClick: undefined
    };
};

export const DeprecatedListItemContext = createContext<DeprecatedListItemContext | undefined>(
    undefined
);

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `List.Item` component from the `@webiny/admin-ui` package instead.
 */
export const ListItem = (props: ListItemProps) => {
    const [item, setItem] = useState<AdminListItemProps>(initializeListItemState());

    const context: DeprecatedListItemContext = useMemo(
        () => ({
            addTitle(value: React.ReactNode) {
                setItem(state => ({
                    ...state,
                    title: value
                }));
            },
            addDescription(value: React.ReactNode) {
                setItem(state => ({
                    ...state,
                    description: value
                }));
            },
            addIcon(value: React.ReactNode) {
                setItem(state => ({
                    ...state,
                    icon: value
                }));
            },
            addActions(value?: React.ReactNode) {
                setItem(state => ({
                    ...state,
                    actions: value
                }));
            },
            addOnClickCallback(callback: React.MouseEventHandler<HTMLDivElement>) {
                setItem(state => ({
                    ...state,
                    onClick: callback
                }));
            }
        }),
        [setItem, props]
    );

    return (
        <AdminList.Item
            activated={props.activated}
            disabled={props.disabled}
            selected={props.selected}
            onClick={item.onClick ?? props.onClick}
            className={props.className}
            style={props.style}
            title={item.title}
            description={item.description}
            actions={item.actions}
            icon={item.icon}
        >
            <DeprecatedListItemContext.Provider value={context}>
                {props.children}
            </DeprecatedListItemContext.Provider>
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
