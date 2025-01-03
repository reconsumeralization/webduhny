import React from "react";
import {
    DrawerContentProps as RmwcDrawerContentProps,
    DrawerHeaderProps as RmwcDrawerHeaderProps
} from "@rmwc/drawer";

import { Sheet as AdminUiSheet, type SheetProps as AdminUiSheetProps } from "@webiny/admin-ui";
import { SheetHeader as AdminUiSheetHeader } from "@webiny/admin-ui/Sheet/components/SheetHeader";

/**
 * Use Drawer component to display navigation for the whole app or just a small section of it.
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Drawer` component from the `@webiny/admin-ui` package instead.
 */
const Drawer = ({ onClose, children, ...props }: DrawerProps) => {
    return (
        <AdminUiSheet
            side={"left"}
            onOpenChange={opened => {
                if (!opened && onClose) {
                    onClose();
                }
            }}
            {...props}
        >
            {children}
        </AdminUiSheet>
    );
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Drawer` component from the `@webiny/admin-ui` package instead.
 */
const DrawerRight = (props: DrawerProps) => {
    return <Drawer side={"right"} {...props} />;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Drawer` component from the `@webiny/admin-ui` package instead.
 */
const DrawerLeft = (props: DrawerProps) => {
    return <Drawer side={"left"} {...props} />;
};

type DrawerHeaderProps = RmwcDrawerHeaderProps & {
    /**
     * Drawer content.
     */
    children: React.ReactNode;

    /**
     * CSS class name
     */
    className?: string;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Dialog` component from the `@webiny/admin-ui` package instead.
 */
const DrawerHeader = (props: DrawerHeaderProps) => {
    return <AdminUiSheetHeader title={props.children} description={""} />;
};

export type DrawerContentProps = RmwcDrawerContentProps & {
    /**
     * Drawer content.
     */
    children: React.ReactNode;

    /**
     * CSS class name
     */
    className?: string;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Drawer` component from the `@webiny/admin-ui` package instead.
 */
const DrawerContent = (props: DrawerContentProps) => {
    return <>{props.children}</>;
};

export interface DrawerProps extends AdminUiSheetProps {
    /**
     * @deprecated Property is no longer supported.
     */
    dismissible?: boolean;

    onClose?: () => void;
}

export { Drawer, DrawerHeader, DrawerContent, DrawerRight, DrawerLeft };
