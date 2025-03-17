import React from "react";
import { Text } from "~/Text";
import { cn, makeDecoratable, type VariantProps } from "~/utils";
import { previewVariants } from "../variants";
import { RemoveItem } from "../../RemoveItem";
import type { FilePreviewDefaultProps } from "../types";

import placeholder from "../assets/placeholder.png";

type RichItemPreviewProps = FilePreviewDefaultProps &
    React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> &
    VariantProps<typeof previewVariants>;

const DecoratableRichItemPreview = ({
    className,
    variant,
    onSelectItem,
    onRemoveItem,
    src = placeholder,
    ...props
}: RichItemPreviewProps) => {
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
                    className="wby-flex wby-items-center wby-justify-between wby-cursor-pointer wby-gap-sm-extra wby-self-stretch wby-min-w-0"
                    onClick={onSelectItem}
                >
                    <div className="wby-size-[56px] wby-m-xs wby-rounded-sm wby-overflow-hidden wby-relative">
                        <img src={src} className="wby-w-full wby-h-full wby-object-cover" />
                    </div>

                    <div className="wby-flex wby-flex-col wby-gap-xxs wby-overflow-hidden wby-flex-1 wby-min-w-0">
                        <Text
                            text="Logotype_final.png"
                            size="sm"
                            as="div"
                            className="wby-text-neutral-primary wby-truncate wby-overflow-hidden wby-whitespace-nowrap wby-w-full"
                        />
                        <Text
                            text="1.8mb"
                            size="sm"
                            className="wby-text-neutral-muted wby-truncate wby-overflow-hidden wby-whitespace-nowrap wby-w-full"
                        />
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
