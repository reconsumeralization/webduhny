import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { DrawerContent } from "./components/DrawerContent";
import { DrawerFooter } from "./components/DrawerFooter";
import { DrawerHeader } from "./components/DrawerHeader";
import { DrawerOverlay } from "./components/DrawerOverlay";
import { DrawerPortal } from "./components/DrawerPortal";
import { DrawerRoot } from "./components/DrawerRoot";
import { DrawerTrigger } from "./components/DrawerTrigger";
import { DrawerClose } from "./components/DrawerClose";
import { Button, ButtonProps } from "~/Button";
import { Separator } from "~/Separator";

export interface DrawerProps
    extends React.ComponentPropsWithoutRef<typeof DrawerRoot>,
        Omit<React.ComponentPropsWithoutRef<typeof DrawerContent>, "title"> {
    trigger?: React.ReactNode;
    title?: React.ReactNode | string;
    showCloseButton?: boolean;
    description?: React.ReactNode | string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    info?: React.ReactNode;
    width?: string;
    separators?: boolean;
    tabs?: boolean;
}

const DrawerBase = (props: DrawerProps) => {
    const { rootProps, triggerProps, contentProps, headerProps, footerProps, otherProps } =
        React.useMemo(() => {
            const {
                // Root props.
                defaultOpen,
                open,
                onOpenChange,
                modal,
                dir,

                // Trigger props.
                trigger,

                // Header props.
                title,
                description,

                // Footer props.
                actions,
                info,

                // Other props.
                separators,

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
                headerProps: { title, description },
                footerProps: { info, actions },
                contentProps: rest,
                otherProps: { separators }
            };
        }, [props]);

    return (
        <DrawerRoot {...rootProps}>
            {triggerProps.children && <DrawerTrigger {...triggerProps} asChild />}
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent {...contentProps}>
                    <div>
                        <DrawerHeader {...headerProps} />
                        {otherProps.separators && <Separator />}
                    </div>
                    <div className={"h-full"}>{contentProps.children}</div>

                    <div>
                        {otherProps.separators && <Separator />}
                        <DrawerFooter {...footerProps} />
                    </div>
                </DrawerContent>
            </DrawerPortal>
        </DrawerRoot>
    );
};

DrawerBase.displayName = "Drawer";

const DecoratableDrawer = makeDecoratable("Drawer", DrawerBase);

const ConfirmButton = (props: ButtonProps) => (
    <Button text={"Confirm"} {...props} variant="primary" />
);

const CancelButton = (props: ButtonProps) => (
    <DrawerClose asChild>
        <Button text={"Cancel"} {...props} variant="secondary" />
    </DrawerClose>
);

const Drawer = withStaticProps(DecoratableDrawer, {
    ConfirmButton,
    CancelButton
});

export { Drawer };
