import React from "react";
import { Drawer as AdminUiDrawer, type DrawerProps as AdminUiDrawerProps } from "@webiny/admin-ui";
import { DrawerHeader as AdminUiDrawerHeader } from "@webiny/admin-ui/Drawer/components/DrawerHeader";

/**
 * Use Drawer component to display navigation for the whole app or just a small section of it.
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Drawer` component from the `@webiny/admin-ui` package instead.
 */
const Drawer = ({ onClose, children, ...props }: DrawerProps) => {
    return (
        <AdminUiDrawer
            side={"left"}
            onOpenChange={opened => {
                if (!opened && onClose) {
                    onClose();
                }
            }}
            {...props}
        >
            {children}
        </AdminUiDrawer>
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

type DrawerHeaderProps = {
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
    return <AdminUiDrawerHeader title={props.children} description={""} />;
};

export type DrawerContentProps = {
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

export interface DrawerProps extends AdminUiDrawerProps {
    /**
     * @deprecated Property is no longer supported.
     */
    dismissible?: boolean;

    onClose?: () => void;
}

export { Drawer, DrawerHeader, DrawerContent, DrawerRight, DrawerLeft };
