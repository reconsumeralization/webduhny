import * as React from "react";
import { cn, cva, type VariantProps } from "~/utils";
import { Text } from "~/Text";

const labelDescriptionVariants = cva("wby-font-normal wby-text-neutral-strong", {
    variants: {
        disabled: {
            true: "wby-text-neutral-disabled"
        }
    }
});

interface LabelDescriptionProps extends VariantProps<typeof labelDescriptionVariants> {
    content: React.ReactNode;
}

const LabelDescription = ({ content, disabled }: LabelDescriptionProps) => (
    <Text className={cn(labelDescriptionVariants({ disabled }))} size={"sm"}>
        {content}
    </Text>
);

export { LabelDescription, type LabelDescriptionProps };
