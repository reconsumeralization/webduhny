import React from "react";
import { List as AdminList } from "@webiny/admin-ui";

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
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `List` component from the `@webiny/admin-ui` package instead.
 */
export class List extends React.Component<ListProps> {
    public override render() {
        return <AdminList>{this.props.children}</AdminList>;
    }
}
