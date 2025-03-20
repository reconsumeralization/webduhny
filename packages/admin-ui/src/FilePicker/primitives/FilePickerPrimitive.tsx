import * as React from "react";
import { cn, cva, type VariantProps, makeDecoratable, withStaticProps } from "~/utils";
import { Trigger } from "./components";
import { Label } from "~/Label";
import { inputVariants } from "~/Input";
import { ImagePreview, RichItemPreview, TextOnlyPreview, FilePreview } from "./components";
import { FileItem, type FileItemDto, type FileItemFormatted } from "../domain";
import { useFilePicker } from "./useFilePicker";
import type { FilePreviewRendererProps, TriggerRendererProps } from "./components/types";

const filePickerVariants = cva(
    [
        "wby-w-full wby-border-sm wby-text-md wby-peer wby-rounded-md",
        "focus-visible:wby-outline-none",
        "data-[disabled=true]:wby-cursor-not-allowed",
        "wby-flex wby-flex-col wby-gap-y-sm-extra"
    ],
    {
        variants: {
            type: {
                area: [
                    "wby-px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))] wby-py-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                compact: [
                    "wby-py-[calc(theme(padding.sm)-theme(borderWidth.sm))] wby-px-[calc(theme(padding.sm)-theme(borderWidth.sm))]"
                ]
            },
            variant: {
                primary: "",
                secondary: "",
                ghost: ["hover:wby-bg-transparent"]
            }
        },
        defaultVariants: {
            type: "area",
            variant: "primary"
        }
    }
);

interface FilePickerPrimitiveProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof inputVariants>,
        VariantProps<typeof filePickerVariants> {
    containerStyle?: React.CSSProperties;
    disabled?: boolean;
    label?: React.ReactElement<typeof Label> | React.ReactNode;
    onEditItem?: (item: FileItemFormatted | null) => void;
    onRemoveItem?: (item: FileItemFormatted | null) => void;
    onSelectItem: () => void;
    placeholder?: string;
    renderFilePreview?: (props: FilePreviewRendererProps) => React.ReactElement<any>;
    renderTrigger?: (props: TriggerRendererProps) => React.ReactElement<any>;
    style?: React.CSSProperties;
    value?: FileItemDto | string | null;
}

const BaseFilePickerPrimitive = ({
    className,
    containerStyle,
    disabled,
    invalid,
    label,
    onEditItem,
    onRemoveItem,
    onSelectItem,
    placeholder,
    renderFilePreview,
    renderTrigger,
    type = "area",
    value,
    variant,
    ...props
}: FilePickerPrimitiveProps) => {
    const { vm } = useFilePicker({ value });
    console.log("className", className);

    return (
        <div
            {...props}
            data-disabled={disabled}
            className={cn(
                inputVariants({ variant, invalid }),
                filePickerVariants({ type, variant }),
                className
            )}
            style={containerStyle}
        >
            {label && type === "area" && label}
            {vm.file ? (
                <FilePreview
                    disabled={disabled}
                    onEditItem={onEditItem ? () => onEditItem(vm.file) : undefined}
                    onRemoveItem={onRemoveItem ? () => onRemoveItem(vm.file) : undefined}
                    onReplaceItem={onSelectItem}
                    renderFilePreview={renderFilePreview}
                    type={type}
                    value={vm.file}
                />
            ) : (
                <Trigger
                    disabled={disabled}
                    onSelectItem={onSelectItem}
                    renderTrigger={renderTrigger}
                    text={placeholder}
                    type={type}
                    variant={variant}
                />
            )}
        </div>
    );
};

const DecoratableFilePickerPrimitive = makeDecoratable(
    "FilePickerPrimitive",
    BaseFilePickerPrimitive
);

const FilePickerPrimitive = withStaticProps(DecoratableFilePickerPrimitive, {
    Preview: {
        Image: ImagePreview,
        RichItem: RichItemPreview,
        TextOnly: TextOnlyPreview
    }
});

export { FilePickerPrimitive, type FileItem, type FilePickerPrimitiveProps, filePickerVariants };
