import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { SheetContent } from "./components/SheetContent";
import { SheetFooter } from "./components/SheetFooter";
import { SheetHeader } from "./components/SheetHeader";
import { SheetOverlay } from "./components/SheetOverlay";
import { SheetPortal } from "./components/SheetPortal";
import { SheetRoot } from "./components/SheetRoot";
import { SheetTrigger } from "./components/SheetTrigger";
import { SheetClose } from "./components/SheetClose";
import { Button, ButtonProps } from "~/Button";

export interface SheetProps
    extends React.ComponentPropsWithoutRef<typeof SheetRoot>,
        Omit<React.ComponentPropsWithoutRef<typeof SheetContent>, "title"> {
    trigger?: React.ReactNode;
    title?: React.ReactNode | string;
    showCloseButton?: boolean;
    description?: React.ReactNode | string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    info?: React.ReactNode;
    width?: string;
}

const SheetBase = (props: SheetProps) => {
    const { rootProps, triggerProps, contentProps, headerProps, footerProps } =
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
                contentProps: rest
            };
        }, [props]);

    return (
        <SheetRoot {...rootProps}>
            {triggerProps.children && <SheetTrigger {...triggerProps} asChild />}
            <SheetPortal>
                <SheetOverlay />
                <SheetContent {...contentProps}>
                    <div>
                        <SheetHeader {...headerProps} />
                        {contentProps.children}
                    </div>
                    <SheetFooter {...footerProps} />
                </SheetContent>
            </SheetPortal>
        </SheetRoot>
    );
};

SheetBase.displayName = "Sheet";

const DecoratableSheet = makeDecoratable("Sheet", SheetBase);

const ConfirmButton = (props: ButtonProps) => (
    <Button text={"Confirm"} {...props} variant="primary" />
);

const CancelButton = (props: ButtonProps) => (
    <SheetClose asChild>
        <Button text={"Cancel"} {...props} variant="secondary" />
    </SheetClose>
);

const Sheet = withStaticProps(DecoratableSheet, {
    ConfirmButton,
    CancelButton
});

export { Sheet };
