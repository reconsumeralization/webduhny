import * as React from "react";
import { cn, cva, type VariantProps, makeDecoratable } from "~/utils";
import { FilePlaceholder, FileImagePreview } from "./components";
import { BrowseFilesParams } from "react-butterfiles";

const fileVariants = cva(
    [
        "wby-w-full wby-border-sm wby-text-md wby-peer wby-rounded-md",
        "focus-visible:wby-outline-none",
        "data-[disabled=true]:wby-cursor-not-allowed"
    ],
    {
        variants: {
            type: {
                compact: [
                    "wby-py-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] wby-px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                area: ["wby-p-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]]"]
            },
            variant: {
                primary: [
                    "wby-bg-neutral-base wby-border-neutral-muted wby-text-neutral-strong placeholder:wby-text-neutral-dimmed",
                    "hover:wby-border-neutral-strong",
                    "focus:wby-border-neutral-black",
                    "data-[focused=true]:wby-border-neutral-black",
                    "data-[disabled=true]:wby-bg-neutral-disabled data-[disabled=true]:wby-border-neutral-dimmed data-[disabled=true]:wby-text-neutral-disabled data-[disabled=true]:placeholder:wby-text-neutral-disabled"
                ],
                secondary: [
                    "wby-bg-neutral-light wby-border-neutral-subtle wby-text-neutral-strong placeholder:wby-text-neutral-dimmed",
                    "hover:wby-bg-neutral-dimmed",
                    "focus:wby-bg-neutral-base focus:wby-border-neutral-black",
                    "data-[focused=true]:wby-bg-neutral-base data-[focused=true]:wby-border-neutral-black",
                    "data-[disabled=true]:wby-bg-neutral-disabled data-[disabled=true]:wby-text-neutral-disabled data-[disabled=true]:placeholder:wby-text-neutral-disabled"
                ],
                ghost: [
                    "wby-bg-transparent wby-border-transparent wby-text-neutral-strong placeholder:wby-text-neutral-dimmed",
                    "hover:wby-bg-neutral-dark/5",
                    "focus:wby-bg-neutral-dark/5",
                    "data-[focused=true]:wby-bg-neutral-dark/5",
                    "data-[disabled=true]:wby-bg-transparent data-[disabled=true]:wby-text-neutral-disabled data-[disabled=true]:placeholder:wby-text-neutral-disabled"
                ]
            },
            invalid: {
                true: ""
            }
        },
        compoundVariants: [
            // Add specific classNames in case of invalid inputs: note the difference between the ghost and the other variants.
            {
                variant: "primary",
                invalid: true,
                class: "!wby-border-destructive-default"
            },
            {
                variant: "secondary",
                invalid: true,
                class: "!wby-border-destructive-default"
            },
            {
                variant: "ghost",
                invalid: true,
                class: "!wby-border-destructive-subtle !wby-bg-destructive-subtle"
            }
        ],
        defaultVariants: {
            type: "compact",
            variant: "primary"
        }
    }
);

interface FilePrimitiveProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof fileVariants> {
    disabled?: boolean;
    placeholder?: string;
    onSelectImage: () => void;
    onRemoveImage?: (value: string | null) => void;
    onEditImage?: (value: BrowseFilesParams | undefined) => void;
    value?: any;
    style?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
}

const DecoratableFilePrimitive = ({
    disabled,
    invalid,
    placeholder,
    type,
    variant,
    onSelectImage,
    value,
    containerStyle,
    ...props
}: FilePrimitiveProps) => {
    return (
        <div
            data-disabled={disabled}
            className={cn(fileVariants({ variant, type, invalid }))}
            style={containerStyle}
            {...props}
        >
            {value && value.src ? (
                <FileImagePreview onSelectImage={onSelectImage} value={value} />
            ) : (
                <FilePlaceholder
                    disabled={disabled}
                    onClick={onSelectImage}
                    text={placeholder}
                    type={type}
                />
            )}
        </div>
    );
};

const FilePrimitive = makeDecoratable("FilePrimitive", DecoratableFilePrimitive);

export { FilePrimitive, type FilePrimitiveProps };
