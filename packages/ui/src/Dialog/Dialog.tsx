import React from "react";
import {
    Button as AdminUiButton,
    type ButtonProps as AdminUiButtonProps,
    Dialog as AdminUiDialog
} from "@webiny/admin-ui";
import { DialogHeader as AdminUiDialogHeader } from "@webiny/admin-ui/Dialog/components/DialogHeader";
import { DialogFooter as AdminUiDialogFooter } from "@webiny/admin-ui/Dialog/components/DialogFooter";
import { DialogClose as AdminUiDialogClose } from "@webiny/admin-ui/Dialog/components/DialogClose";

export type DialogOnClose = any;

export interface DialogActionsProps {
    children: React.ReactNode[] | React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Dialog` component from the `@webiny/admin-ui` package instead.
 */
export const DialogActions = (props: DialogActionsProps) => {
    return <AdminUiDialogFooter style={{ marginTop: 32 }} actions={props.children} />;
};

export interface DialogAcceptProps extends AdminUiButtonProps {
    children?: React.ReactNode[] | React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Dialog` component from the `@webiny/admin-ui` package instead.
 */
export const DialogAccept = (props: DialogAcceptProps) => {
    return <AdminUiButton {...props} variant={"primary"} text={props.text || props.children} />;
};

export interface DialogButtonProps extends AdminUiButtonProps {
    children?: React.ReactNode[] | React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Dialog` component from the `@webiny/admin-ui` package instead.
 */
export const DialogButton = (props: DialogButtonProps) => {
    return <AdminUiButton {...props} variant={"secondary"} text={props.text || props.children} />;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Dialog` component from the `@webiny/admin-ui` package instead.
 */
export const DialogCancel = (props: DialogButtonProps) => {
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

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Dialog` component from the `@webiny/admin-ui` package instead.
 */
export const DialogContent = (props: DialogContentProps) => {
    return <>{props.children}</>;
};

DialogContent.displayName = "DialogContent";

export interface DialogTitleProps {
    children: React.ReactNode[] | React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Dialog` component from the `@webiny/admin-ui` package instead.
 */
export const DialogTitle = (props: DialogTitleProps) => {
    return <AdminUiDialogHeader title={props.children} description={""} />;
};

DialogTitle.displayName = "DialogTitle";

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Dialog` component from the `@webiny/admin-ui` package instead.
 */
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
};
