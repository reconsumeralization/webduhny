import * as React from "react";
import { cn, cva, type VariantProps, makeDecoratable } from "~/utils";
import { FilePlaceholder, FileImagePreview } from "./components";
import { BrowseFilesParams } from "react-butterfiles";
import { Label } from "~/Label";
import { FormComponentLabel } from "~/FormComponent";
import { inputVariants } from "~/Input";

const fileVariants = cva(
    [
        "wby-w-full wby-border-sm wby-text-md wby-peer wby-rounded-md",
        "focus-visible:wby-outline-none",
        "data-[disabled=true]:wby-cursor-not-allowed",
        "wby-flex wby-flex-col wby-gap-y-sm-extra"
    ],
    {
        variants: {
            type: {
                compact: [
                    "wby-py-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] wby-px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                area: [
                    "wby-px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))] wby-py-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ]
            },
            variant: {
                primary: "",
                secondary: "",
                ghost: ["hover:wby-bg-transparent"]
            }
        },
        defaultVariants: {
            type: "compact",
            variant: "primary"
        }
    }
);

interface FilePrimitiveProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof inputVariants>,
        VariantProps<typeof fileVariants> {
    disabled?: boolean;
    placeholder?: string;
    onSelectImage: () => void;
    onRemoveImage?: (value: string | null) => void;
    onEditImage?: (value: BrowseFilesParams | undefined) => void;
    value?: any;
    label?: React.ReactElement<typeof Label> | React.ReactNode;
    style?: React.CSSProperties;
    required?: boolean;
    containerStyle?: React.CSSProperties;
}

const DecoratableFilePrimitive = ({
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
}: FilePrimitiveProps) => {
    return (
        <div
            data-disabled={disabled}
            className={cn(inputVariants({ variant, invalid }), fileVariants({ type, variant }))}
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
                <FileImagePreview
                    onSelectImage={onSelectImage}
                    onRemoveImage={onRemoveImage}
                    value={value}
                />
            ) : (
                <FilePlaceholder
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

const FilePrimitive = makeDecoratable("FilePrimitive", DecoratableFilePrimitive);

export { FilePrimitive, type FilePrimitiveProps };
