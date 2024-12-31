import * as React from "react";
import { makeDecoratable } from "~/utils";
import { DialogContent } from "./components/DialogContent";
import { DialogFooter } from "~/Dialog/components/DialogFooter";
import { DialogHeader } from "~/Dialog/components/DialogHeader";
import { DialogOverlay } from "~/Dialog/components/DialogOverlay";
import { DialogPortal } from "./components/DialogPortal";
import { DialogRoot } from "./components/DialogRoot";
import { DialogTrigger } from "./components/DialogTrigger";

export interface DialogProps
    extends React.ComponentPropsWithoutRef<typeof DialogRoot>,
        Omit<React.ComponentPropsWithoutRef<typeof DialogContent>, "title"> {
    trigger?: React.ReactNode;
    title?: React.ReactNode | string;
    showCloseButton?: boolean;
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
                    children: trigger
                },
                headerProps: { title, description },
                footerProps: { info, actions },
                contentProps: rest
            };
        }, [props]);

    console.log('contentProps', contentProps)
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

const Dialog = makeDecoratable("Dialog", DialogBase);

export { Dialog };
