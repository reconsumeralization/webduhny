import React from "react";
import {
    type FileItem,
    type FilePickerPrimitiveProps,
    filePickerVariants,
    FilePreview,
    ImagePreview,
    RichItemPreview,
    TextOnlyPreview,
    Trigger
} from "~/FilePicker";
import { cn, makeDecoratable, withStaticProps } from "~/utils";
import { Button } from "~/Button";
import { inputVariants } from "~/Input";
import { FormComponentLabel } from "~/FormComponent";

interface MultiFilePickerPrimitiveProps
    extends Omit<FilePickerPrimitiveProps, "value" | "onEditItem" | "onRemoveItem"> {
    values?: FileItem[] | null;
    buttonPlaceholder?: string;
    onReplaceItem: (item: FileItem | null, index: number) => void;
    onEditItem?: (item: FileItem | null, index: number) => void;
    onRemoveItem?: (item: FileItem | null, index: number) => void;
}

const BaseMultiFilePickerPrimitive = ({
    buttonPlaceholder,
    containerStyle,
    disabled,
    invalid,
    label,
    onEditItem,
    onRemoveItem,
    onReplaceItem,
    onSelectItem,
    placeholder,
    renderFilePreview,
    required,
    type = "area",
    values = [],
    variant,
    ...props
}: MultiFilePickerPrimitiveProps) => {
    return (
        <div
            data-disabled={disabled}
            className={cn(
                inputVariants({ variant, invalid }),
                filePickerVariants({ type, variant }),
                "wby-max-h-[280px]"
            )}
            style={containerStyle}
            {...props}
        >
            {label && type === "area" && (
                <div className={"wby-flex wby-justify-between"}>
                    <FormComponentLabel
                        text={label}
                        required={required}
                        disabled={disabled}
                        className={"wby-mb-0"}
                    />
                    <Button
                        text={buttonPlaceholder ?? "Select a file"}
                        variant={"ghost"}
                        onClick={onSelectItem}
                        size={"sm"}
                        disabled={disabled}
                    />
                </div>
            )}
            {values?.length ? (
                <div className="wby-overflow-y-scroll wby-flex wby-flex-col wby-gap-xs">
                    {values.map((value, i) => (
                        <FilePreview
                            key={`file-preview-${i}`}
                            disabled={disabled}
                            onEditItem={() => onEditItem && onEditItem(value, i)}
                            onRemoveItem={() => onRemoveItem && onRemoveItem(value, i)}
                            onReplaceItem={() => onReplaceItem(value, i)}
                            renderFilePreview={renderFilePreview}
                            type={type}
                            value={value}
                        />
                    ))}
                </div>
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

const DecoratableMultiFilePickerPrimitive = makeDecoratable(
    "MultiFilePickerPrimitive",
    BaseMultiFilePickerPrimitive
);

const MultiFilePickerPrimitive = withStaticProps(DecoratableMultiFilePickerPrimitive, {
    Preview: {
        Image: ImagePreview,
        RichItem: RichItemPreview,
        TextOnly: TextOnlyPreview
    }
});

export { MultiFilePickerPrimitive, type FileItem, type MultiFilePickerPrimitiveProps };
