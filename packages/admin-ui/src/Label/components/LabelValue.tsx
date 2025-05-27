import * as React from "react";
import { cn, cva, type VariantProps } from "~/utils";
import { Text } from "~/Text";

const labelValueVariants = cva("wby-text-neutral-strong", {
    variants: {
        weight: {
            strong: "wby-font-semibold",
            light: "wby-font-regular"
        },
        disabled: {
            true: "wby-text-neutral-disabled"
        }
    },
    defaultVariants: {
        weight: "strong"
    }
});

interface LabelValueProps extends VariantProps<typeof labelValueVariants> {
    value: React.ReactNode;
}

const LabelValue = ({ value, weight, disabled }: LabelValueProps) => (
    <Text size="sm" className={cn(labelValueVariants({ weight, disabled }))}>
        {value}
    </Text>
);

export { LabelValue, type LabelValueProps };
