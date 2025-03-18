import React from "react";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";
import { RemoveItem } from "../RemoveItem";
import { SelectItem } from "../SelectItem";
import { ItemDescription } from "../ItemDescription";
import type { FilePreviewDefaultProps } from "../types";
import { previewVariants } from "../variants";

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
    disabled,
    onRemoveItem,
    onSelectItem,
    small,
    variant,
    value,
    ...props
}: TextOnlyPreviewProps) => {
    const { name, size } = value;

    return (
        <div
            data-testid="image-preview"
            className={cn(
                textOnlyPreviewVariants({ small }),
                previewVariants({ variant, disabled }),
                className
            )}
            {...props}
        >
            <div
                data-role="select-image"
                onClick={onSelectItem}
                className={"wby-overflow-hidden wby-flex-1 wby-min-w-0"}
            >
                <ItemDescription name={name} size={size} disabled={disabled} small={!!small} />
            </div>
            <div className={"wby-flex wby-justify-center wby-items-center wby-gap-sm"}>
                {small && (
                    <SelectItem onSelectItem={onSelectItem} small={!!small} disabled={disabled} />
                )}
                {onRemoveItem && (
                    <RemoveItem onRemoveItem={onRemoveItem} small={!!small} disabled={disabled} />
                )}
            </div>
        </div>
    );
};

const TextOnlyPreview = makeDecoratable("TextOnlyPreview", DecoratableTextOnlyPreview);

export { TextOnlyPreview, type TextOnlyPreviewProps };
