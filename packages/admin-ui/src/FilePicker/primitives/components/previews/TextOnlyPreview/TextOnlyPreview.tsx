import React from "react";
import { Text } from "~/Text";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";
import { previewVariants } from "../variants";
import { RemoveItem } from "../../RemoveItem";
import type { FilePreviewDefaultProps } from "../types";
import { SelectItem } from "~/FilePicker/primitives/components/SelectItem";

const textOnlyPreviewVariants = cva(
    "wby-w-full wby-flex wby-items-center wby-justify-between wby-gap-sm wby-min-w-0",
    {
        variants: {
            small: {
                true: "wby-px-sm wby-py-xs wby-rounded-xs",
                false: "wby-px-sm wby-py-xs-plus wby-rounded-md"
            }
        },
        defaultVariants: {
            small: false
        }
    }
);

type TextOnlyPreviewProps = FilePreviewDefaultProps &
    React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> &
    VariantProps<typeof previewVariants> &
    VariantProps<typeof textOnlyPreviewVariants>;

const DecoratableTextOnlyPreview = ({
    className,
    small,
    variant,
    onSelectItem,
    onRemoveItem,
    ...props
}: TextOnlyPreviewProps) => {
    return (
        <div
            data-testid="image-preview"
            className={cn(
                textOnlyPreviewVariants({ small }),
                previewVariants({ variant }),
                className
            )}
            {...props}
        >
            <div
                data-role="select-image"
                onClick={onSelectItem}
                className={"wby-overflow-hidden wby-flex-1 wby-min-w-0"}
            >
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
            <div>
                {small && <SelectItem onSelectItem={onSelectItem} small={!!small} />}
                {onRemoveItem && <RemoveItem onRemoveItem={onRemoveItem} small={!!small} />}
            </div>
        </div>
    );
};

const TextOnlyPreview = makeDecoratable("TextOnlyPreview", DecoratableTextOnlyPreview);

export { TextOnlyPreview, type TextOnlyPreviewProps };
