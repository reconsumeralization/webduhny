import React from "react";
import {
    type FilePickerPrimitiveProps,
    filePickerVariants,
    FilePreview,
    type FileValue,
    ImagePreview,
    RichItemPreview,
    TextOnlyPreview,
    Trigger
} from "~/FilePicker";
import { cn, makeDecoratable, withStaticProps } from "~/utils";
import { Button } from "~/Button";
import { inputVariants } from "~/Input";
import { FormComponentLabel } from "~/FormComponent";

interface MultiFilePickerPrimitiveProps extends Omit<FilePickerPrimitiveProps, "value"> {
    values?: FileValue[] | null;
    buttonPlaceholder?: string;
}

const BaseMultiFilePickerPrimitive = ({
    containerStyle,
    disabled,
    invalid,
    label,
    onSelectItem,
    onRemoveItem,
    buttonPlaceholder,
    placeholder,
    required,
    type = "area",
    values,
    variant,
    renderFilePreview,
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
            {values ? (
                <div className="wby-overflow-y-scroll wby-flex wby-flex-col wby-gap-xs">
                    {values.map((value, i) => (
                        <FilePreview
                            key={`file-preview-${i}`}
                            disabled={disabled}
                            onRemoveItem={() => onRemoveItem && onRemoveItem(value?.src)}
                            onSelectItem={onSelectItem}
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

export { MultiFilePickerPrimitive, type FileValue, type MultiFilePickerPrimitiveProps };
