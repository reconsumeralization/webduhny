import * as React from "react";
import * as SliderPrimitives from "@radix-ui/react-slider";
import { cn, makeDecoratable, cva, type VariantProps } from "~/utils";
import { Text } from "~/Text";
import { useSlider } from "./useSlider";

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
                "wby-relative wby-flex wby-w-full wby-touch-none wby-select-none wby-items-center wby-cursor-pointer",
                "data-[disabled]:wby-cursor-not-allowed"
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
            "wby-relative wby-h-xxs wby-w-full wby-grow wby-overflow-hidden wby-rounded-full",
            "wby-bg-neutral-strong",
            "data-[disabled]:wby-bg-neutral-muted"
        )}
    >
        <SliderPrimitives.Range
            className={cn([
                "wby-absolute wby-h-full",
                "wby-bg-primary-default",
                "data-[disabled]:wby-bg-primary-disabled"
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

type SliderPrimitiveTooltipProps = VariantProps<typeof sliderTooltipVariants> & {
    textValue: string;
    showTooltip?: boolean;
    tooltipSide?: "top" | "bottom";
};

const DecoratableSliderPrimitiveTooltip = ({
    textValue,
    showTooltip,
    tooltipSide
}: SliderPrimitiveTooltipProps) => {
    if (!textValue || !showTooltip) {
        return null;
    }

    return (
        <div className={cn(sliderTooltipVariants({ side: tooltipSide }))}>
            <Text text={textValue} size={"sm"} as={"div"} />
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
    textValue,
    showTooltip,
    tooltipSide
}: SliderPrimitiveThumbProps) => (
    <SliderPrimitives.Thumb
        className={cn(
            "wby-inline-block wby-w-md wby-h-md wby-mt-xs-plus wby-rounded-xxl wby-border-md wby-transition-colors wby-outline-none",
            "wby-bg-primary-default wby-border-white",
            "hover:wby-bg-primary-strong",
            "active:wby-bg-primary-default",
            "data-[disabled]:wby-pointer-events-none data-[disabled]:wby-bg-primary-disabled"
        )}
    >
        <SliderPrimitiveTooltip
            showTooltip={showTooltip}
            textValue={textValue}
            tooltipSide={tooltipSide}
        />
    </SliderPrimitives.Thumb>
);
const SliderPrimitiveThumb = makeDecoratable(
    "SliderPrimitiveThumb",
    DecoratableSliderPrimitiveThumb
);

/**
 * Slider Renderer
 */

type SliderPrimitiveRootProps = Omit<SliderPrimitives.SliderProps, "min"> & {
    min: number;
};

type SliderPrimitiveRendererProps = SliderPrimitiveRootProps & SliderPrimitiveThumbProps;

const DecoratableSliderPrimitiveRenderer = ({
    tooltipSide,
    textValue,
    showTooltip,
    ...sliderProps
}: SliderPrimitiveVm) => {
    return (
        <div className={"wby-flex wby-h-md wby-w-full"}>
            <SliderPrimitiveRoot {...sliderProps}>
                <SliderPrimitiveTrack />
                <SliderPrimitiveThumb
                    textValue={textValue}
                    showTooltip={showTooltip}
                    tooltipSide={tooltipSide}
                />
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

type SliderPrimitiveVm = SliderPrimitiveRootProps & SliderPrimitiveThumbProps;

const DecoratableSliderPrimitive = (props: SliderPrimitiveProps) => {
    const { vm, changeValue, commitValue } = useSlider(props);
    return (
        <SliderPrimitiveRenderer
            {...props}
            {...vm}
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
    type SliderPrimitiveThumbProps,
    type SliderPrimitiveRendererProps
};
