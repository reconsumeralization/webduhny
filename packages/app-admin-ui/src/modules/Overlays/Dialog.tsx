// TODO (next PR): revisit this file and refresh it with the latest changes.
import React, { useCallback, useEffect, useState } from "react";
import get from "lodash/get";
import { useUi } from "@webiny/app/hooks/useUi";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogCancel,
    DialogAccept
} from "@webiny/ui/Dialog";

export const DialogContainer = () => {
    const ui = useUi();
    const [isLoading, setIsLoading] = useState(false);
    const message: React.ReactNode = get(ui, "dialog.message");
    const {
        dataTestId,
        title,
        loading,
        actions = { cancel: null, accept: { label: "OK" } },
        style,
        onClose
    } = get(ui, "dialog.options", {});

    const hideDialog = useCallback(() => {
        ui.setState(ui => ({ ...ui, dialog: null }));
        if (typeof onClose === "function") {
            onClose();
        }
    }, [ui]);
    /**
     * We need this part because message can change while the dialog is opened and in loading state.
     */
    useEffect(() => {
        setIsLoading(false);
    }, [ui?.dialog?.message]);

    const handleConfirm = async () => {
        if (!actions.accept.onClick) {
            /**
             * Should not happen as users should define "accept.onClick" function, but just in case lets show the information.
             * Possible to happen in development process.
             */
            console.info("There is no actions.accept.onClick callback defined.");
            hideDialog();
            return;
        }
        setIsLoading(true);
        await actions.accept.onClick();
        setIsLoading(false);
        hideDialog();
    };

    return (
        <Dialog
            open={!!message}
            onClose={hideDialog}
            data-testid={dataTestId}
            style={style}
            showCloseButton={false}
        >
            {isLoading ? loading : null}
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                {actions.cancel && (
                    <DialogCancel onClick={actions.cancel.onClick}>
                        {actions.cancel.label}
                    </DialogCancel>
                )}
                {actions.accept && (
                    <DialogAccept
                        data-testid={"confirmationdialog-confirm-action"}
                        onClick={handleConfirm}
                    >
                        {actions.accept.label}
                    </DialogAccept>
                )}
            </DialogActions>
        </Dialog>
    );
};
