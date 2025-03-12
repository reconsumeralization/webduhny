import * as React from "react";
import { ReactComponent as TrashIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { BrowseFilesParams } from "react-butterfiles";
import { IconButton } from "~/Button";
import { Icon } from "~/Icon";
import { cn } from "~/utils";

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
    onRemoveImage,
    imageStyle,
    className,
    ...props
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
        <div data-testid={"image-preview"} className={cn("wby-relative", className)} {...props}>
            <div className={"wby-absolute wby-top-1 wby-right-1.5"}>
                <IconButton
                    icon={
                        <Icon
                            icon={<TrashIcon />}
                            label={"Remove"}
                            size={"md"}
                            color={"neutral-light"}
                        />
                    }
                    variant={"ghost"}
                    size={"sm"}
                    iconSize={"lg"}
                    onClick={() => {
                        onRemoveImage && onRemoveImage(value);
                    }}
                />
            </div>
            <div data-role={"select-image"} className={"wby-cursor-pointer"}>
                {imagePreview}
            </div>
        </div>
    );
};

export { FileImagePreview, type FileImagePreviewProps };
