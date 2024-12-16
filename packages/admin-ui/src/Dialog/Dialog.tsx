import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { DialogClose } from "./components/DialogClose";
import { DialogContent } from "./components/DialogContent";
import { DialogDescription } from "~/Dialog/components/DialogDescription";
import { DialogFooter } from "~/Dialog/components/DialogFooter";
import { DialogHeader } from "~/Dialog/components/DialogHeader";
import { DialogOverlay } from "~/Dialog/components/DialogOverlay";
import { DialogPortal } from "./components/DialogPortal";
import { DialogRoot } from "./components/DialogRoot";
import { DialogTitle } from "./components/DialogTitle";
import { DialogTrigger } from "./components/DialogTrigger";

interface DialogProps
    extends React.ComponentPropsWithoutRef<typeof DialogRoot>,
        React.ComponentPropsWithoutRef<typeof DialogContent> {
    trigger: React.ReactNode;
    children: React.ReactNode;
}

const DialogBase = React.forwardRef<React.ElementRef<typeof DialogRoot>, DialogProps>(
    (props, ref) => {
        const { rootProps, triggerProps, contentProps } = React.useMemo(() => {
            const {
                // Root props.
                defaultOpen,
                open,
                onOpenChange,
                modal,
                dir,

                // Trigger props.
                trigger,

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
                    // Temporary fix.
                    children: <div>{trigger}</div>
                },
                contentProps: rest
            };
        }, [props]);

        return (
            <DialogRoot {...rootProps}>
                <DialogTrigger {...triggerProps} asChild />
                <DialogPortal>
                    <DialogOverlay/>
                    <DialogContent {...contentProps} ref={ref} />
                </DialogPortal>
            </DialogRoot>
        );
    }
);

DialogBase.displayName = "Dialog";

const DecoratableDialog = makeDecoratable("Dialog", DialogBase);

const Dialog = withStaticProps(DecoratableDialog, {
    Close: DialogClose,
    Description: DialogDescription,
    Footer: DialogFooter,
    Header: DialogHeader,
    Title: DialogTitle
});

export { Dialog };
