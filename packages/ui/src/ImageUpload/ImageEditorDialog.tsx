import React from "react";
import { DialogOnClose } from "../Dialog";
import { Alert } from "@webiny/admin-ui";

interface ImageEditorDialogProps {
    dialogZIndex?: number;
    onClose?: DialogOnClose;
    open?: boolean;
    /**
     * We would need to drill down a lot to give correct options.
     * TODO: figure out some other way.
     */
    options?: any;
    src?: string;
    onAccept: (src: string) => void;
    "data-testid"?: string;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please check the `ImageEditorDialog` component inside the `@webiny/app-file-manager` package instead.
 */
export const ImageEditorDialog = ({}: ImageEditorDialogProps) => {
    return (
        <Alert type="danger" variant={"strong"}>
            {
                "Deprecated component! The original code has been moved to `@webiny/app-file-manager` package."
            }
        </Alert>
    );
};
