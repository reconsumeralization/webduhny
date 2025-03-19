import React from "react";
import { FilePicker } from "@webiny/admin-ui";

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
const Image = ({
    uploadImage,
    removeImage,
    editImage,
    renderImagePreview,
    ...props
}: ImageProps) => {
    console.log("props", props);

    return (
        <FilePicker
            {...props}
            onEditItem={editImage}
            onSelectItem={uploadImage}
            onRemoveItem={() => removeImage && removeImage(null)}
            renderFilePreview={renderImagePreview}
        />
    );
};

export default Image;
