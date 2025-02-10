import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { DrawerContent } from "./components/DrawerContent";
import { DrawerFooter } from "./components/DrawerFooter";
import { DrawerHeader } from "./components/DrawerHeader";
import { DrawerOverlay } from "./components/DrawerOverlay";
import { DrawerPortal } from "./components/DrawerPortal";
import { DrawerRoot } from "./components/DrawerRoot";
import { DrawerTrigger } from "./components/DrawerTrigger";
import { DrawerBody } from "~/Drawer/components/DrawerBody";
import { Icon } from "./components/Icon";
import { ConfirmButton } from "./components/ConfirmButton";
import { CancelButton } from "./components/CancelButton";

interface DrawerProps
    extends React.ComponentPropsWithoutRef<typeof DrawerRoot>,
        Omit<React.ComponentPropsWithoutRef<typeof DrawerContent>, "title"> {
    trigger?: React.ReactNode;
    title?: React.ReactNode;
    icon?: React.ReactElement;
    modal?: boolean;
    showCloseButton?: boolean;
    bodyPadding?: boolean;
    description?: React.ReactNode;
    children: React.ReactNode;
    actions?: React.ReactNode;
    info?: React.ReactNode;
    width?: React.CSSProperties["width"];
}

const DrawerBase = (props: DrawerProps) => {
    const { rootProps, triggerProps, contentProps, headerProps, bodyProps, footerProps } =
        React.useMemo(() => {
            const {
                // Root props.
                defaultOpen,
                open,
                onOpenChange,

                // We want the drawer to always allow interaction with the outside elements.
                modal = false,
                dir,

                // Trigger props.
                trigger,

                // Header props.
                title,
                icon,
                description,
                showCloseButton,

                // Body props.
                children,
                bodyPadding,

                // Footer props.
                actions,
                info,

                // Content props.
                ...rest
            } = props;

            return {
                rootProps: {
                    defaultOpen,
                    open,
                    onOpenChange,
                    modal,
                    dir
                },
                triggerProps: {
                    // Temporary fix. We need this because `ref` doesn't get passed to components
                    // that are decorated with `makeDecoratable`. This will be fixed in the future.
                    children: <div>{trigger}</div>
                },
                headerProps: { title, icon, description, showCloseButton },
                bodyProps: { children, bodyPadding },
                footerProps: { info, actions },
                contentProps: rest
            };
        }, [props]);

    return (
        <DrawerRoot {...rootProps}>
            {triggerProps.children && <DrawerTrigger {...triggerProps} asChild />}
            <DrawerPortal>
                {rootProps.modal && <DrawerOverlay />}
                <DrawerContent {...contentProps} modal={rootProps.modal}>
                    <DrawerHeader {...headerProps} />
                    <DrawerBody {...bodyProps} />
                    <DrawerFooter {...footerProps} />
                </DrawerContent>
            </DrawerPortal>
        </DrawerRoot>
    );
};

DrawerBase.displayName = "Drawer";

const DecoratableDrawer = makeDecoratable("Drawer", DrawerBase);

const Drawer = withStaticProps(DecoratableDrawer, {
    ConfirmButton,
    CancelButton,
    Icon
});

export { Drawer, type DrawerProps };
