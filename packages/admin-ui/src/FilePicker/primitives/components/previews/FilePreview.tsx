import * as React from "react";
import { type VariantProps } from "~/utils";
import { filePickerVariants } from "~/FilePicker";
import { FilePreviewDefaultProps } from "../types";
import { RichItemPreview, TextOnlyPreview } from "../previews";

type FilePreviewProps = FilePreviewDefaultProps & {
    type: VariantProps<typeof filePickerVariants>["type"];
    renderFilePreview?: (props: any) => React.ReactElement<any>;
};

const FilePreview = ({ type, renderFilePreview, ...props }: FilePreviewProps) => {
    if (typeof renderFilePreview === "function") {
        return renderFilePreview(props);
    }

    if (type === "compact") {
        return <TextOnlyPreview {...props} />;
    }

    return <RichItemPreview {...props} />;
};

export { FilePreview, type FilePreviewProps };
