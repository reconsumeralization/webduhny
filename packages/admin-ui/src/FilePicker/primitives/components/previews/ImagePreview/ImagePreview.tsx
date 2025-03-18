import React from "react";
import { cn, makeDecoratable } from "~/utils";
import { RemoveItem } from "../RemoveItem";
import { previewVariants } from "../variants";
import type { FilePreviewDefaultProps } from "../types";

type ImagePreviewProps = FilePreviewDefaultProps;

const DecoratableImagePreview = ({
    value,
    className,
    variant,
    disabled,
    onRemoveItem,
    onSelectItem
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
                className={"wby-cursor-pointer wby-max-w-[128px] wby-max-h-[128px]"}
                data-role={"select-image"}
                onClick={onSelectItem}
            >
                <img src={value.src} alt={value.name} />
            </div>
            {onRemoveItem && (
                <div className={"wby-absolute wby-top-1 wby-right-1.5"}>
                    <RemoveItem onRemoveItem={onRemoveItem} disabled={disabled} />
                </div>
            )}
        </div>
    );
};

const ImagePreview = makeDecoratable("FileImagePreview", DecoratableImagePreview);

export { ImagePreview, type ImagePreviewProps };
