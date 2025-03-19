import * as React from "react";
import { MultiFilePicker } from "@webiny/admin-ui";

/**
 * TODO @ts-refactor
 */
interface MultiImageUploadProps {
    imagePreviewProps: {
        src: string;
        [key: string]: any;
    };
    [key: string]: any;
}
const MultiImageUpload = ({ props }: MultiImageUploadProps) => {
    return <MultiFilePicker {...props} />;
};
export default MultiImageUpload;
