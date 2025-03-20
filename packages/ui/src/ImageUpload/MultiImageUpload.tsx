import React from "react";
import { FormComponentProps } from "../types";
import { Alert } from "@webiny/admin-ui";

interface MultiImageUploadProps extends FormComponentProps {
    // Component label.
    label?: string;

    // Is component disabled?
    disabled?: boolean;

    // Description beneath the image.
    description?: string;

    // A className for the root element.
    className?: string;

    // Define a list of accepted image types.
    accept?: string[];

    // Define file's max allowed size (default is "5mb").
    // Uses "bytes" (https://www.npmjs.com/package/bytes) library to convert string notation to actual number.
    maxSize: string;

    // Image editor options.
    // Please check the docs of ImageEditor component for the list of all available options.
    imageEditor?: {
        [key: string]: any;
    };

    // Use these to customize error messages (eg. if i18n supported is needed).
    errorMessages: {
        maxSizeExceeded: string;
        unsupportedFileType: string;
        default: string;
    };

    // Cropper options
    cropper?: { [key: string]: any };
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please check the `MultiFilePicker` component inside the `@webiny/admin-ui` package instead.
 */
export const MultiImageUpload = ({}: MultiImageUploadProps) => {
    return (
        <Alert type="danger" variant={"strong"}>
            {
                "Deprecated component! The original code has been moved to `@webiny/admin-ui` package."
            }
        </Alert>
    );
};
