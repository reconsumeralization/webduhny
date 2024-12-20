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
import { DialogTrigger } from "./components/DialogTrigger";

export interface DialogProps
    extends React.ComponentPropsWithoutRef<typeof DialogRoot>,
        Omit<React.ComponentPropsWithoutRef<typeof DialogContent>, "title"> {
    trigger: React.ReactNode;
    title?: React.ReactNode | string;
    description?: React.ReactNode | string;
    children: React.ReactNode;
}

const DialogBase = React.forwardRef<React.ElementRef<typeof DialogRoot>, DialogProps>(
    (props, ref) => {
        const { rootProps, triggerProps, contentProps, headerProps } = React.useMemo(() => {
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
                headerProps: { title, description },
                contentProps: rest
            };
        }, [props]);

        return (
            <DialogRoot {...rootProps}>
                <DialogTrigger {...triggerProps} asChild />
                <DialogPortal>
                    <DialogOverlay />
                    <DialogContent {...contentProps} ref={ref}>
                        <DialogHeader {...headerProps}/>
                        {contentProps.children}
                    </DialogContent>
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
    Footer: DialogFooter
});

export { Dialog };
