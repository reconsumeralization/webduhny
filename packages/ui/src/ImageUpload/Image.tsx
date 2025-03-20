import React from "react";
import { Alert } from "@webiny/admin-ui";

interface ImageProps {
    uploadImage: () => void;
    removeImage?: (value: string | null) => void;
    editImage?: (value: any | undefined) => void;
    value?: any;
    disabled?: boolean;
    loading?: boolean;
    placeholder?: string;
    style?: React.CSSProperties;
    renderImagePreview?: (props: any) => React.ReactElement<any>;
    round?: boolean;
    containerStyle?: React.CSSProperties;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `FilePicker` component from the `@webiny/admin-ui` package instead.
 */
export const Image = ({}: ImageProps) => {
    return (
        <Alert type="danger" variant={"strong"}>
            {
                "Deprecated component! The original code has been moved to `@webiny/admin-ui` package."
            }
        </Alert>
    );
};
