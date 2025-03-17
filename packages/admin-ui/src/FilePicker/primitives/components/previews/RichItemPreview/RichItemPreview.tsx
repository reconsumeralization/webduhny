import React from "react";
import bytes from "bytes";
import { Text } from "~/Text";
import { cn, makeDecoratable } from "~/utils";
import { previewVariants } from "../variants";
import { RemoveItem } from "../../RemoveItem";
import type { FilePreviewDefaultProps } from "../types";
import { RichItemThumbnail } from "~/FilePicker/primitives/components/previews/RichItemPreview/RichItemThumbnail";

type RichItemPreviewProps = FilePreviewDefaultProps & {
    preview?: "thumbnail" | "file-type" | "placeholder";
};

const DecoratableRichItemPreview = ({
    className,
    variant,
    onSelectItem,
    onRemoveItem,
    value,
    ...props
}: RichItemPreviewProps) => {
    const { src, name, mimeType, size } = value;

    return (
        <div
            data-testid="image-preview"
            className={cn("wby-w-full wby-rounded-md", previewVariants({ variant }), className)}
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
                    <RichItemThumbnail src={src} name={name} mimeType={mimeType} />
                    <div className="wby-flex wby-flex-col wby-gap-xxs wby-overflow-hidden wby-flex-1 wby-min-w-0">
                        <Text
                            text={name}
                            size="sm"
                            as="div"
                            className="wby-text-neutral-primary wby-truncate wby-overflow-hidden wby-whitespace-nowrap wby-w-full"
                        />
                        {size && (
                            <Text
                                text={bytes.format(size, { unitSeparator: " " })}
                                size="sm"
                                className="wby-text-neutral-muted wby-truncate wby-overflow-hidden wby-whitespace-nowrap wby-w-full"
                            />
                        )}
                    </div>
                </div>

                {onRemoveItem && (
                    <div className="wby-pr-sm-extra">
                        <RemoveItem onRemoveItem={onRemoveItem} />
                    </div>
                )}
            </div>
        </div>
    );
};

const RichItemPreview = makeDecoratable("RichItemPreview", DecoratableRichItemPreview);

export { RichItemPreview, type RichItemPreviewProps };
