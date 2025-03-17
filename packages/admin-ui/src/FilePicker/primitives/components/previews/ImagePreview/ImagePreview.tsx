import React from "react";
import { cn, makeDecoratable, type VariantProps } from "~/utils";
import { RemoveItem } from "../../RemoveItem";
import type { FilePreviewDefaultProps } from "../types";
import { previewVariants } from "../variants";

type ImagePreviewProps = FilePreviewDefaultProps &
    React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> &
    VariantProps<typeof previewVariants>;

const DecoratableImagePreview = ({
    className,
    variant,
    onRemoveItem,
    onSelectItem,
    ...props
}: ImagePreviewProps) => {
    const finalProps = { ...props };

    const srcSet = finalProps.srcSet;
    if (srcSet && typeof srcSet === "object") {
        finalProps.srcSet = Object.keys(srcSet)
            .map(key => `${srcSet[key]} ${key}`)
            .join(", ");
    }

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
                <img {...finalProps} />
            </div>
            {onRemoveItem && (
                <div className={"wby-absolute wby-top-1 wby-right-1.5"}>
                    <RemoveItem onRemoveItem={onRemoveItem} />
                </div>
            )}
        </div>
    );
};

const ImagePreview = makeDecoratable("FileImagePreview", DecoratableImagePreview);

export { ImagePreview, type ImagePreviewProps };
