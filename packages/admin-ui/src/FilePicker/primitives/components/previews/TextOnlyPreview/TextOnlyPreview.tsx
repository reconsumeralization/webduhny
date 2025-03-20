import React from "react";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";
import { ItemDescription } from "../ItemDescription";
import { ItemActions } from "~/FilePicker/primitives/components/previews/ItemActions";
import type { FilePreviewDefaultProps } from "../../types";
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
    React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof previewVariants> &
    VariantProps<typeof textOnlyPreviewVariants>;

const DecoratableTextOnlyPreview = ({
    className,
    disabled,
    onRemoveItem,
    onReplaceItem,
    onEditItem,
    small,
    variant,
    value,
    ...props
}: TextOnlyPreviewProps) => {
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
                onClick={onReplaceItem}
                className={"wby-overflow-hidden wby-flex-1 wby-min-w-0 wby-cursor-pointer"}
            >
                <ItemDescription item={value} disabled={disabled} small={!!small} />
            </div>
            <ItemActions
                onRemoveItem={onRemoveItem}
                onReplaceItem={onReplaceItem}
                onEditItem={onEditItem}
                small={!!small}
                disabled={disabled}
            />
        </div>
    );
};

const TextOnlyPreview = makeDecoratable("TextOnlyPreview", DecoratableTextOnlyPreview);

export { TextOnlyPreview, type TextOnlyPreviewProps };
