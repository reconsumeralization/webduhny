import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { DialogContent } from "./components/DialogContent";
import { DialogFooter } from "~/Dialog/components/DialogFooter";
import { DialogHeader } from "~/Dialog/components/DialogHeader";
import { DialogOverlay } from "~/Dialog/components/DialogOverlay";
import { DialogPortal } from "./components/DialogPortal";
import { DialogRoot } from "./components/DialogRoot";
import { DialogTrigger } from "./components/DialogTrigger";
import { DialogClose } from "./components/DialogClose";
import { Button, ButtonProps } from "~/Button";

export interface DialogProps
    extends React.ComponentPropsWithoutRef<typeof DialogRoot>,
        Omit<React.ComponentPropsWithoutRef<typeof DialogContent>, "title"> {
    trigger?: React.ReactNode;
    title?: React.ReactNode | string;
    showCloseButton?: boolean;
    preventOutsideDismiss?: boolean;
    description?: React.ReactNode | string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    info?: React.ReactNode;
}

const DialogBase = (props: DialogProps) => {
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
                ...contentProps
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
                contentProps
            };
        }, [props]);

    return (
        <DialogRoot {...rootProps}>
            {triggerProps.children && <DialogTrigger {...triggerProps} asChild />}
            <DialogPortal>
                <DialogOverlay />
                <DialogContent {...contentProps}>
                    <div>
                        <DialogHeader {...headerProps} />
                        {contentProps.children}
                    </div>

                    <DialogFooter {...footerProps} />
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
    );
};

DialogBase.displayName = "Dialog";

const DecoratableDialog = makeDecoratable("Dialog", DialogBase);

const ConfirmButton = makeDecoratable("ConfirmButton", (props: ButtonProps) => (
    <Button text={"Confirm"} {...props} variant="primary" />
));

const CancelButton = makeDecoratable("CancelButton", (props: ButtonProps) => (
    <DialogClose asChild>
        <Button text={"Cancel"} {...props} variant="secondary" />
    </DialogClose>
));

const Dialog = withStaticProps(DecoratableDialog, {
    ConfirmButton,
    CancelButton
});

export { Dialog };
