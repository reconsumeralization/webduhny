import React from "react";
import { cn, makeDecoratable } from "~/utils";
import { RichItemThumbnail } from "./RichItemThumbnail";
import { ItemDescription } from "../ItemDescription";
import { RemoveItem } from "../RemoveItem";
import { previewVariants } from "../variants";
import type { FilePreviewDefaultProps } from "../types";

type RichItemPreviewProps = FilePreviewDefaultProps & {
    preview?: "thumbnail" | "file-type" | "placeholder";
};

const DecoratableRichItemPreview = ({
    className,
    disabled,
    onRemoveItem,
    onSelectItem,
    value,
    variant,
    preview,
    ...props
}: RichItemPreviewProps) => {
    const { src, name, mimeType, size } = value;

    return (
        <div
            data-testid="image-preview"
            className={cn(
                "wby-w-full wby-rounded-md",
                previewVariants({ variant, disabled }),
                className
            )}
            {...props}
        >
            <div
                data-role="select-image"
                className="wby-flex wby-items-center wby-justify-between wby-gap-sm-extra wby-min-w-0"
            >
                <div
                    className="wby-flex wby-items-center wby-justify-between wby-flex-1 wby-cursor-pointer wby-gap-sm-extra wby-self-stretch wby-min-w-0"
                    onClick={onSelectItem}
                >
                    <RichItemThumbnail
                        src={src}
                        name={name}
                        mimeType={mimeType}
                        disabled={disabled}
                        preview={preview}
                    />
                    <ItemDescription name={name} size={size} disabled={disabled} />
                </div>

                {onRemoveItem && (
                    <div className="wby-pr-sm-extra">
                        <RemoveItem onRemoveItem={onRemoveItem} disabled={disabled} />
                    </div>
                )}
            </div>
        </div>
    );
};

const RichItemPreview = makeDecoratable("RichItemPreview", DecoratableRichItemPreview);

export { RichItemPreview, type RichItemPreviewProps };
