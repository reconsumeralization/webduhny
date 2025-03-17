import type { FileValue } from "~/FilePicker";
import type { VariantProps } from "~/utils";
import { previewVariants } from "./variants";

export interface FilePreviewDefaultProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
        VariantProps<typeof previewVariants> {
    onSelectItem: () => void;
    onRemoveItem?: () => void;
    value: FileValue;
    disabled?: boolean;
}
