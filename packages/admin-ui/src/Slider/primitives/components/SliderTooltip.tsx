import * as React from "react";
import { cn, cva, type VariantProps } from "~/utils";
import { Text } from "~/Text";

const sliderTooltipVariants = cva(
    [
        "wby-px-xs-plus wby-py-xxs wby-rounded-sm wby-absolute wby-left-1/2 -wby-translate-x-1/2",
        "wby-bg-neutral-muted"
    ],
    {
        variants: {
            side: {
                top: "wby-bottom-8",
                bottom: "wby-top-8"
            }
        },
        defaultVariants: {
            side: "bottom"
        }
    }
);

type SliderTooltipProps = VariantProps<typeof sliderTooltipVariants> & {
    textValue: string;
    showTooltip?: boolean;
    tooltipSide?: "top" | "bottom";
};

const SliderTooltip = ({ textValue, showTooltip, tooltipSide }: SliderTooltipProps) => {
    if (!textValue || !showTooltip) {
        return null;
    }

    return (
        <div className={cn(sliderTooltipVariants({ side: tooltipSide }))}>
            <Text text={textValue} size={"sm"} as={"div"} />
        </div>
    );
};

export { SliderTooltip, type SliderTooltipProps };
