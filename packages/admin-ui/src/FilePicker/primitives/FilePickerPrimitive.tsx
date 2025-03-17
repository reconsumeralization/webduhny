import * as React from "react";
import { cn, cva, type VariantProps, makeDecoratable, withStaticProps } from "~/utils";
import { Trigger } from "./components";
import { Label } from "~/Label";
import { FormComponentLabel } from "~/FormComponent";
import { inputVariants } from "~/Input";
import { ImagePreview, RichItemPreview, TextOnlyPreview } from "./components";

type FileItemPreviewProps = {
    renderImagePreview?: (props: any) => React.ReactElement<any>;
    value?: any;
    style?: React.CSSProperties;
};

const FileItemPreview = ({ value, style, renderImagePreview }: FileItemPreviewProps) => {
    const imagePreviewProps: any = {
        src: value?.src,
        style: style ?? null
    };

    if (typeof renderImagePreview === "function") {
        return renderImagePreview(imagePreviewProps);
    } else {
        return <img {...imagePreviewProps} />;
    }
};

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
                    "wby-py-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] wby-px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
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
    disabled?: boolean;
    placeholder?: string;
    onSelectImage: () => void;
    onRemoveImage?: (value: string | null) => void;
    value?: any;
    label?: React.ReactElement<typeof Label> | React.ReactNode;
    style?: React.CSSProperties;
    required?: boolean;
    containerStyle?: React.CSSProperties;
    renderImagePreview?: (props: any) => React.ReactElement<any>;
}

const BaseFilePickerPrimitive = ({
    containerStyle,
    disabled,
    invalid,
    label,
    onRemoveImage,
    onSelectImage,
    placeholder,
    required,
    type,
    value,
    variant,
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
            {value && value.src ? (
                <FileItemPreview {...props} value={value} />
            ) : (
                <Trigger
                    disabled={disabled}
                    onClick={onSelectImage}
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

export { FilePickerPrimitive, type FilePickerPrimitiveProps };
