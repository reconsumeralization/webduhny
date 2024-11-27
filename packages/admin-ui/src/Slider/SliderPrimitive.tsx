import * as React from "react";
import * as SliderPrimitives from "@radix-ui/react-slider";
import { cn, makeDecoratable, cva, type VariantProps } from "~/utils";
import { Text } from "~/Text";
import { useSliderPrimitive } from "./useSliderPrimitive";

type SliderPrimitiveVm = Omit<SliderPrimitives.SliderProps, "min"> & {
    min: number;
};

/**
 * Slider Root
 */
const DecoratableSliderPrimitiveRoot = React.forwardRef<
    React.ElementRef<typeof SliderPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitives.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitives.Root
        ref={ref}
        className={cn(
            [
                "relative flex w-full touch-none select-none items-center cursor-pointer",
                "data-[disabled]:cursor-not-allowed"
            ],
            className
        )}
        {...props}
    />
));

DecoratableSliderPrimitiveRoot.displayName = SliderPrimitives.Root.displayName;

const SliderPrimitiveRoot = makeDecoratable("SliderPrimitiveRoot", DecoratableSliderPrimitiveRoot);

/**
 * Slider Track
 */
const DecoratableSliderPrimitiveTrack = () => (
    <SliderPrimitives.Track
        className={cn(
            "relative h-xxs w-full grow overflow-hidden rounded-full",
            "bg-neutral-strong",
            "data-[disabled]:bg-neutral-muted"
        )}
    >
        <SliderPrimitives.Range
            className={cn([
                "absolute h-full",
                "bg-primary-default",
                "data-[disabled]:bg-primary-disabled"
            ])}
        />
    </SliderPrimitives.Track>
);

const SliderPrimitiveTrack = makeDecoratable(
    "SliderPrimitiveTrack",
    DecoratableSliderPrimitiveTrack
);

/**
 * Slider Tooltip
 */
const sliderTooltipVariants = cva(
    ["px-xs-plus py-xxs rounded-sm absolute left-1/2 -translate-x-1/2", "bg-neutral-muted"],
    {
        variants: {
            side: {
                top: "bottom-8",
                bottom: "top-8"
            }
        },
        defaultVariants: {
            side: "bottom"
        }
    }
);

type SliderPrimitiveTooltipProps = VariantProps<typeof sliderTooltipVariants> & {
    value?: string;
    showTooltip?: boolean;
    tooltipSide?: "top" | "bottom";
};

const DecoratableSliderPrimitiveTooltip = ({
    value,
    showTooltip,
    tooltipSide
}: SliderPrimitiveTooltipProps) => {
    if (!value || !showTooltip) {
        return null;
    }

    return (
        <div className={cn(sliderTooltipVariants({ side: tooltipSide }))}>
            <Text text={value} size={"sm"} as={"div"} />
        </div>
    );
};

const SliderPrimitiveTooltip = makeDecoratable(
    "SliderPrimitiveTooltip",
    DecoratableSliderPrimitiveTooltip
);

/**
 * Slider Thumb
 */
type SliderPrimitiveThumbProps = SliderPrimitiveTooltipProps;

const DecoratableSliderPrimitiveThumb = ({
    value,
    showTooltip,
    tooltipSide
}: SliderPrimitiveThumbProps) => (
    <SliderPrimitives.Thumb
        className={cn(
            "inline-block w-md h-md mt-xs-plus rounded-xxl border-md transition-colors outline-none",
            "bg-primary-default border-white",
            "hover:bg-primary-strong",
            "active:bg-primary-default",
            "data-[disabled]:pointer-events-none data-[disabled]:bg-primary-disabled"
        )}
    >
        <SliderPrimitiveTooltip showTooltip={showTooltip} value={value} tooltipSide={tooltipSide} />
    </SliderPrimitives.Thumb>
);

const SliderPrimitiveThumb = makeDecoratable(
    "SliderPrimitiveThumb",
    DecoratableSliderPrimitiveThumb
);

/**
 * SliderRenderer
 */
interface SliderPrimitiveRendererProps {
    sliderVm: SliderPrimitiveVm;
    thumbVm: SliderPrimitiveThumbProps;
    onValueChange: (values: number[]) => void;
    onValueCommit: (values: number[]) => void;
}

const DecoratableSliderPrimitiveRenderer = ({
    sliderVm,
    thumbVm,
    onValueChange,
    onValueCommit
}: SliderPrimitiveRendererProps) => {
    return (
        <div className={"flex h-md w-full"}>
            <SliderPrimitiveRoot
                {...sliderVm}
                onValueChange={onValueChange}
                onValueCommit={onValueCommit}
            >
                <SliderPrimitiveTrack />
                <SliderPrimitiveThumb {...thumbVm} />
            </SliderPrimitiveRoot>
        </div>
    );
};

const SliderPrimitiveRenderer = makeDecoratable(
    "SliderPrimitiveRenderer",
    DecoratableSliderPrimitiveRenderer
);

/**
 * Slider
 */
interface SliderPrimitiveProps
    extends Omit<
        SliderPrimitives.SliderProps,
        "defaultValue" | "value" | "onValueChange" | "onValueCommit"
    > {
    onValueChange: (value: number) => void;
    onValueCommit?: (value: number) => void;
    showTooltip?: boolean;
    tooltipSide?: "top" | "bottom";
    transformValue?: (value: number) => string;
    value?: number;
}

const DecoratableSliderPrimitive = (props: SliderPrimitiveProps) => {
    const { vm, changeValue, commitValue } = useSliderPrimitive(props);
    return (
        <SliderPrimitiveRenderer
            sliderVm={vm.sliderVm}
            thumbVm={vm.thumbVm}
            onValueChange={changeValue}
            onValueCommit={commitValue}
        />
    );
};

const SliderPrimitive = makeDecoratable("SliderPrimitive", DecoratableSliderPrimitive);

export {
    SliderPrimitive,
    SliderPrimitiveRenderer,
    SliderPrimitiveRoot,
    SliderPrimitiveTrack,
    SliderPrimitiveThumb,
    type SliderPrimitiveVm,
    type SliderPrimitiveProps,
    type SliderPrimitiveThumbProps
};
