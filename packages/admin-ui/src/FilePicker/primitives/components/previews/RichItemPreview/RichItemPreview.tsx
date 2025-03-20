import React from "react";
import { cn, makeDecoratable } from "~/utils";
import { RichItemThumbnail } from "./RichItemThumbnail";
import { ItemDescription } from "../ItemDescription";
import { ItemActions } from "~/FilePicker/primitives/components/previews/ItemActions";
import { previewVariants } from "../variants";
import type { FilePreviewDefaultProps } from "../../types";

type RichItemPreviewProps = FilePreviewDefaultProps & {
    preview?: "thumbnail" | "file-type" | "placeholder";
};

const DecoratableRichItemPreview = ({
    className,
    disabled,
    onRemoveItem,
    onReplaceItem,
    onEditItem,
    value,
    variant,
    preview,
    ...props
}: RichItemPreviewProps) => {
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
                    onClick={onReplaceItem}
                >
                    <RichItemThumbnail {...value} disabled={disabled} preview={preview} />
                    <ItemDescription item={value} disabled={disabled} />
                </div>

                <ItemActions
                    onRemoveItem={onRemoveItem}
                    onReplaceItem={onReplaceItem}
                    onEditItem={onEditItem}
                    disabled={disabled}
                    className={"wby-pr-sm-extra"}
                />
            </div>
        </div>
    );
};

const RichItemPreview = makeDecoratable("RichItemPreview", DecoratableRichItemPreview);

export { RichItemPreview, type RichItemPreviewProps };
