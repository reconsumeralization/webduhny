import * as React from "react";
import { cn, cva, type VariantProps } from "~/utils";

const sliderValueVariants = cva("wby-font-normal wby-text-sm wby-leading-none", {
    variants: {
        disabled: {
            true: "wby-text-neutral-disabled wby-cursor-not-allowed"
        }
    }
});

interface SliderValueProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof sliderValueVariants> {
    value?: string;
}

const SliderValue = ({ value, disabled, className }: SliderValueProps) => {
    if (!value) {
        return null;
    }
    return <span className={cn(sliderValueVariants({ disabled }), className)}>{value}</span>;
};

export { SliderValue, type SliderValueProps };
