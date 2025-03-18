import type { FileItem } from "~/FilePicker";
import type { VariantProps } from "~/utils";
import { previewVariants } from "./variants";

export interface FilePreviewDefaultProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
        VariantProps<typeof previewVariants> {
    onReplaceItem?: () => void;
    onRemoveItem?: () => void;
    onEditItem?: () => void;
    value: FileItem;
    disabled?: boolean;
}
