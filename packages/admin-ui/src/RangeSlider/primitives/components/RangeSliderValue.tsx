import * as React from "react";
import { cn, cva, type VariantProps } from "~/utils";

const rangeSliderValueVariants = cva("wby-font-normal wby-text-sm wby-leading-none", {
    variants: {
        disabled: {
            true: "wby-text-neutral-disabled wby-cursor-not-allowed"
        }
    }
});

interface RangeSliderValueProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof rangeSliderValueVariants> {
    value: string;
}

const RangeSliderValue = ({ value, disabled, className }: RangeSliderValueProps) => {
    if (!value) {
        return null;
    }
    return <span className={cn(rangeSliderValueVariants({ disabled }), className)}>{value}</span>;
};

export { RangeSliderValue, type RangeSliderValueProps };
