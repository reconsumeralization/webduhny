import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { DialogContent } from "./components/DialogContent";
import { DialogHeader } from "~/Dialog/components/DialogHeader";
import { DialogBody } from "~/Dialog/components/DialogBody";
import { DialogFooter } from "~/Dialog/components/DialogFooter";
import { DialogOverlay } from "~/Dialog/components/DialogOverlay";
import { DialogPortal } from "./components/DialogPortal";
import { DialogRoot } from "./components/DialogRoot";
import { DialogTrigger } from "./components/DialogTrigger";
import { Icon } from "./components/Icon";
import { ConfirmButton } from "./components/ConfirmButton";
import { CancelButton } from "./components/CancelButton";
import { DialogClose } from "~/Dialog/components/DialogClose";

interface DialogProps
    extends React.ComponentPropsWithoutRef<typeof DialogRoot>,
        Omit<React.ComponentPropsWithoutRef<typeof DialogContent>, "title"> {
    trigger?: React.ReactNode;
    title?: React.ReactNode;
    icon?: React.ReactElement;
    showCloseButton?: boolean;
    dismissible?: boolean;
    bodyPadding?: boolean;
    description?: React.ReactNode;
    children: React.ReactNode;
    actions?: React.ReactNode;
    info?: React.ReactNode;
}

const DialogBase = (props: DialogProps) => {
    const {
        rootProps,
        triggerProps,
        contentProps,
        headerProps,
        bodyProps,
        footerProps,
        closeButtonProps
    } = React.useMemo(() => {
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
            icon,
            description,

            // Body props.
            children,
            bodyPadding,

            // Footer props.
            actions,
            info,

            // Close button props.
            showCloseButton = true,

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
            headerProps: { title, icon, description },
            bodyProps: { children, bodyPadding },
            footerProps: { info, actions },
            closeButtonProps: { show: showCloseButton },
            contentProps
        };
    }, [props]);

    return (
        <DialogRoot {...rootProps}>
            {triggerProps.children && <DialogTrigger {...triggerProps} asChild />}
            <DialogPortal>
                <DialogOverlay />
                <DialogContent {...contentProps}>
                    <DialogHeader {...headerProps} />
                    <DialogBody {...bodyProps} />
                    <DialogFooter {...footerProps} />
                    {closeButtonProps.show && <DialogClose />}
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
    );
};

DialogBase.displayName = "Dialog";

const DecoratableDialog = makeDecoratable("Dialog", DialogBase);

const Dialog = withStaticProps(DecoratableDialog, {
    ConfirmButton,
    CancelButton,
    Icon
});

export { Dialog, type DialogProps };
