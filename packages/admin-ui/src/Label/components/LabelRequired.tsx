import * as React from "react";
import { cn, cva, type VariantProps } from "~/utils";

const labelRequiredVariants = cva("wby-text-destructive-primary", {
    variants: {
        disabled: {
            true: "wby-text-destructive-muted"
        }
    }
});

type LabelRequiredProps = VariantProps<typeof labelRequiredVariants>;

const LabelRequired = ({ disabled }: LabelRequiredProps) => (
    <span className={cn(labelRequiredVariants({ disabled }))}>{"*"}</span>
);

export { LabelRequired, type LabelRequiredProps };
