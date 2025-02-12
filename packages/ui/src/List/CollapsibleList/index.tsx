import React from "react";

export interface CollapsibleListProps {
    /** The handle that opens and closes the collapsible section. Usually a ListItem. */
    handle: React.ReactElement<any>;
    /** Starts the collapsible list as open. */
    defaultOpen?: boolean;
    /** Callback for when the collapsible list opens. */
    onOpen?: () => void;
    /** Callback for when the collapsible list closes. */
    onClose?: () => void;

    /** CollapsibleState */
    open: boolean;
    childrenStyle: React.CSSProperties;

    /** Component props */
    children: React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `List` component from the `@webiny/admin-ui` package instead.
 */
export const CollapsibleList = (props: CollapsibleListProps) => {
    console.warn(
        "The `CollapsibleList` component is deprecated and will be removed in future releases. Please refer to the documentation for the recommended alternative."
    );
    return <>{props.children}</>;
};

export default CollapsibleList;
