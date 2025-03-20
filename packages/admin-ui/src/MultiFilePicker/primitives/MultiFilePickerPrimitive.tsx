import React from "react";
import {
    type FileItemDto,
    type FileItemFormatted,
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
import { useMultiFilePicker } from "~/MultiFilePicker/primitives/useMultiFilePicker";

interface MultiFilePickerPrimitiveProps
    extends Omit<FilePickerPrimitiveProps, "value" | "onEditItem" | "onRemoveItem"> {
    values?: FileItemDto[] | string[] | null;
    buttonPlaceholder?: string;
    onReplaceItem: (item: FileItemFormatted | null, index: number) => void;
    onEditItem?: (item: FileItemFormatted | null, index: number) => void;
    onRemoveItem?: (item: FileItemFormatted | null, index: number) => void;
}

const BaseMultiFilePickerPrimitive = ({
    className,
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
    renderTrigger,
    type = "area",
    values = [],
    variant,
    ...props
}: MultiFilePickerPrimitiveProps) => {
    const { vm } = useMultiFilePicker({ values });

    return (
        <div
            {...props}
            data-disabled={disabled}
            className={cn(
                inputVariants({ variant, invalid }),
                filePickerVariants({ type, variant }),
                "wby-max-h-[280px]",
                className
            )}
            style={containerStyle}
        >
            {label && type === "area" && (
                <div className={"wby-flex wby-justify-between"}>
                    {label}
                    <Button
                        text={buttonPlaceholder ?? "Select a file"}
                        variant={"ghost"}
                        onClick={onSelectItem}
                        size={"sm"}
                        disabled={disabled}
                    />
                </div>
            )}
            {vm.hasFiles ? (
                <div className="wby-overflow-y-scroll wby-flex wby-flex-col wby-gap-xs">
                    {vm.files.map((file, i) => (
                        <FilePreview
                            key={`file-preview-${i}`}
                            disabled={disabled}
                            onEditItem={onEditItem ? () => onEditItem(file, i) : undefined}
                            onRemoveItem={onRemoveItem ? () => onRemoveItem(file, i) : undefined}
                            onReplaceItem={onReplaceItem ? () => onReplaceItem(file, i) : undefined}
                            renderFilePreview={renderFilePreview}
                            type={type}
                            value={file}
                        />
                    ))}
                </div>
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

export {
    MultiFilePickerPrimitive,
    type FileItemFormatted,
    type FileItemDto,
    type MultiFilePickerPrimitiveProps
};
