import * as React from "react";
import { cn, cva, type VariantProps, makeDecoratable, withStaticProps } from "~/utils";
import { Trigger } from "./components";
import { Label } from "~/Label";
import { FormComponentLabel } from "~/FormComponent";
import { inputVariants } from "~/Input";
import { ImagePreview, RichItemPreview, TextOnlyPreview } from "./components";
import { FilePreview } from "~/FilePicker/primitives/components/previews/FilePreview";

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

type FileValue = {
    name: string;
    src: string;
    mimeType?: string;
    size?: number;
};

interface FilePickerPrimitiveProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof inputVariants>,
        VariantProps<typeof filePickerVariants> {
    disabled?: boolean;
    placeholder?: string;
    onSelectItem: () => void;
    onRemoveItem?: (value: string | null) => void;
    value?: FileValue | null;
    label?: React.ReactElement<typeof Label> | React.ReactNode;
    style?: React.CSSProperties;
    required?: boolean;
    containerStyle?: React.CSSProperties;
    renderFilePreview?: (props: any) => React.ReactElement<any>;
}

const BaseFilePickerPrimitive = ({
    containerStyle,
    disabled,
    invalid,
    label,
    onSelectItem,
    onRemoveItem,
    placeholder,
    required,
    type = "area",
    value,
    variant,
    renderFilePreview,
    ...props
}: FilePickerPrimitiveProps) => {
    return (
        <div
            data-disabled={disabled}
            className={cn(
                inputVariants({ variant, invalid }),
                filePickerVariants({ type, variant })
            )}
            style={containerStyle}
            {...props}
        >
            {label && type === "area" && (
                <FormComponentLabel
                    text={label}
                    required={required}
                    disabled={disabled}
                    className={"wby-mb-0"}
                />
            )}
            {value ? (
                <FilePreview
                    disabled={disabled}
                    onRemoveItem={() => onRemoveItem && onRemoveItem(value?.src)}
                    onSelectItem={onSelectItem}
                    renderFilePreview={renderFilePreview}
                    type={type}
                    value={value}
                />
            ) : (
                <Trigger
                    disabled={disabled}
                    onClick={onSelectItem}
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

export { FilePickerPrimitive, type FileValue, type FilePickerPrimitiveProps, filePickerVariants };
