import type { VariantProps } from "~/utils";
import { previewVariants } from "./variants";
import type { FileItemFormatted } from "../../../domain";

export interface FilePreviewDefaultProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
        VariantProps<typeof previewVariants> {
    onReplaceItem?: () => void;
    onRemoveItem?: () => void;
    onEditItem?: () => void;
    value: FileItemFormatted;
    disabled?: boolean;
}
