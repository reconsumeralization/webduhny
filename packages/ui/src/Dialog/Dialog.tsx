import React from "react";
import {
    Button as AdminUiButton,
    type ButtonProps as AdminUiButtonProps,
    Dialog as AdminUiDialog
} from "@webiny/admin-ui";
import { DialogHeader as AdminUiDialogHeader } from "@webiny/admin-ui/Dialog/components/DialogHeader";
import { DialogFooter as AdminUiDialogFooter } from "@webiny/admin-ui/Dialog/components/DialogFooter";
import { DialogClose as AdminUiDialogClose } from "@webiny/admin-ui/Dialog/components/DialogClose";

//export type DialogOnClose = (event: DialogOnCloseEventT) => void;
export type DialogOnClose = any;

// export interface DialogProps extends RmwcDialogProps {
//     className?: string;
//
//     // Component's custom in-line styles.
//     style?: React.CSSProperties;
//
//     onClose?: (evt: DialogOnCloseEventT) => void;
//
//     preventOutsideDismiss?: boolean;
//
//     children?: React.ReactNode;
// }

export interface DialogActionsProps {
    children: React.ReactNode[] | React.ReactNode;
}

export const DialogActions = (props: DialogActionsProps) => {
    return <AdminUiDialogFooter style={{ marginTop: 32 }} actions={props.children} />;
};

export interface DialogAcceptProps extends AdminUiButtonProps {
    children: React.ReactNode[] | React.ReactNode;
}

export const DialogAccept = (props: DialogAcceptProps) => {
    return <AdminUiButton variant={"primary"} {...props} />;
};

export interface DialogCancelProps extends AdminUiButtonProps {
    children: React.ReactNode[] | React.ReactNode;
}

export const DialogCancel = (props: DialogCancelProps) => {
    return (
        <AdminUiDialogClose asChild>
            <AdminUiButton {...props} variant={"secondary"} text={props.text || props.children} />
        </AdminUiDialogClose>
    );
};

DialogActions.displayName = "DialogActions";

export interface DialogContentProps {
    children: React.ReactNode[] | React.ReactNode;
}

export const DialogContent = (props: DialogContentProps) => {
    return <>{props.children}</>;
};

DialogContent.displayName = "DialogContent";

export interface DialogTitleProps {
    children: React.ReactNode[] | React.ReactNode;
}

export const DialogTitle = (props: DialogTitleProps) => {
    return <AdminUiDialogHeader title={props.children} description={""} />;
};

DialogTitle.displayName = "DialogTitle";

export const Dialog = ({ onClose, open, children, showCloseButton }: any) => {
    return (
        <AdminUiDialog
            open={open}
            showCloseButton={showCloseButton}
            onOpenChange={opened => {
                if (!opened && onClose) {
                    onClose();
                }
            }}
        >
            {children}
        </AdminUiDialog>
    );

    // container: HTMLElement;
    //
    // constructor(props: DialogProps) {
    //     super(props);
    //     /**
    //      * We can safely cast
    //      */
    //     this.container = document.getElementById("dialog-container") as HTMLElement;
    //
    //     if (!this.container) {
    //         this.container = document.createElement("div");
    //         this.container.setAttribute("id", "dialog-container");
    //         const container = this.container;
    //         document.body && document.body.appendChild(container);
    //     }
    // }
    //
    // public override render() {
    //     const { children, ...props } = this.props;
    //     const container = this.container;
    //
    //     // Let's pass "permanent" / "persistent" / "temporary" flags as "mode" prop instead.
    //     return ReactDOM.createPortal(
    //         <RmwcDialog {...getClasses(props, "webiny-ui-dialog")}>{children}</RmwcDialog>,
    //         container
    //     );
    // }
};

// export interface DialogTitleProps extends RmwcDialogTitleProps {
//     /**
//      * Title text.
//      */
//     children: React.ReactNode[] | React.ReactNode;
// }
//
// /**
//  * Dialog's header, which can accept DialogHeaderTitle component or any other set of components.
//  */
// export const DialogTitle = (props: DialogTitleProps) => (
//     <RmwcDialogTitle
//         {...getClasses(props, "webiny-ui-dialog__title")}
//         style={{ marginBottom: "0" }}
//     />
// );
//
// export type DialogContentProps = RmwcDialogContentProps & {
//     /**
//      * Dialog content.
//      */
//     children: React.ReactNode[] | React.ReactNode;
//
//     className?: string;
// };
//
// /**
//  * A simple component for showing dialog's body.
//  */
// export const DialogContent = (props: DialogContentProps) => (
//     <RmwcDialogContent {...getClasses(props, "webiny-ui-dialog__content")} />
// );
//
// export interface DialogActionsProps extends RmwcDialogActionsProps {
//     /**
//      * Action buttons.
//      */
//     children: React.ReactNode[] | React.ReactNode;
//
//     // Dialog component's custom in-line styles.
//     style?: React.CSSProperties;
// }
//
// /**
//  * Can be used to show accept and cancel buttons.
//  */
// export const DialogActions = (props: DialogActionsProps) => (
//     <RmwcDialogActions {...getClasses(props, ["webiny-ui-dialog__actions"])} />
// );
//
// interface DialogButtonProps extends RmwcDialogButtonProps {
//     /**
//      * Callback to execute then button is clicked.
//      */
//     onClick?: (e: React.MouseEvent) => void;
//
//     className?: string;
// }
//
// /**
//  * Use this to show a simple button.
//  */
// export const DialogButton = (props: DialogButtonProps) => (
//     <RmwcDialogButton {...getClasses(props, "webiny-ui-dialog__button")} />
// );
//
// interface DialogCancelProps extends RmwcDialogButtonProps {
//     /**
//      * Callback to execute then button is clicked.
//      */
//     onClick?: (e: React.MouseEvent) => void;
// }
//
// /**
//  * Use this to close the dialog without taking any additional action.
//  */
// export const DialogCancel = (props: DialogCancelProps) => {
//     return (
//         <DialogButton
//             {...getClasses(props, "webiny-ui-dialog__button webiny-ui-dialog__button--cancel")}
//             action="close"
//             data-testid="dialog-cancel"
//         >
//             {props.children}
//         </DialogButton>
//     );
// };
//
// interface DialogAcceptProps extends RmwcDialogButtonProps {
//     /**
//      * Callback to execute then button is clicked.
//      */
//     onClick?: (e: React.MouseEvent) => void;
// }
//
// /**
//  * Use this to close the dialog without taking any additional action.
//  */
// export const DialogAccept = (props: DialogAcceptProps) => {
//     return (
//         <DialogButton
//             {...getClasses(props, "webiny-ui-dialog__button webiny-ui-dialog__button--accept")}
//             action="accept"
//             data-testid="dialog-accept"
//         >
//             {props.children}
//         </DialogButton>
//     );
// };
