import * as React from "react";
import { BrowseFilesParams } from "react-butterfiles";

interface FileImagePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: any;
    imageStyle?: React.CSSProperties;
    renderImagePreview?: (props: any) => React.ReactElement<any>;
    onSelectImage: () => void;
    onRemoveImage?: (value: string | null) => void;
    onEditImage?: (value: BrowseFilesParams | undefined) => void;
}

const FileImagePreview = ({
    renderImagePreview,
    value,
    onSelectImage,
    imageStyle
}: FileImagePreviewProps) => {
    const imagePreview = React.useMemo(() => {
        const imagePreviewProps: any = {
            src: value ? value.src : null,
            style: imageStyle ?? null,
            onClick: () => onSelectImage()
        };

        if (typeof renderImagePreview === "function") {
            return renderImagePreview(imagePreviewProps);
        } else {
            return <img {...imagePreviewProps} />;
        }
    }, [value, renderImagePreview]);
    return (
        <div data-testid={"image-preview"}>
            <div data-role={"select-image"}>{imagePreview}</div>
        </div>
    );
};

export { FileImagePreview, type FileImagePreviewProps };
