import React from "react";
import { cn, makeDecoratable } from "~/utils";
import { previewVariants } from "../variants";
import type { FilePreviewDefaultProps } from "../../types";
import { ItemActions } from "~/FilePicker/primitives/components/previews/ItemActions";

type ImagePreviewProps = FilePreviewDefaultProps;

const DecoratableImagePreview = ({
    value,
    className,
    variant,
    disabled,
    onRemoveItem,
    onReplaceItem,
    onEditItem
}: ImagePreviewProps) => {
    return (
        <div
            className={cn(
                "wby-flex wby-justify-center wby-items-center wby-py-sm wby-rounded-md wby-relative",
                previewVariants({ variant }),
                className
            )}
            data-testid={"image-preview"}
        >
            <div
                className={
                    "wby-cursor-pointer wby-size-[128px] wby-flex wby-justify-center wby-items-center"
                }
                data-role={"select-image"}
                onClick={onReplaceItem}
            >
                <img
                    src={value.url}
                    alt={value.name}
                    className={"wby-object-contain wby-size-full"}
                />
            </div>
            <div className={"wby-absolute wby-top-1 wby-right-1.5"}>
                <ItemActions
                    onRemoveItem={onRemoveItem}
                    onEditItem={onEditItem}
                    disabled={disabled}
                    className={"wby-flex-col"}
                />
            </div>
        </div>
    );
};

const ImagePreview = makeDecoratable("FileImagePreview", DecoratableImagePreview);

export { ImagePreview, type ImagePreviewProps };
