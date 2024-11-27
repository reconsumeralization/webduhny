import * as React from "react";
import * as SliderPrimitives from "@radix-ui/react-slider";
import {
    SliderPrimitiveRoot,
    SliderPrimitiveThumb,
    SliderPrimitiveThumbProps,
    SliderPrimitiveTrack
} from "~/Slider";
import { makeDecoratable } from "~/utils";
import { useRangeSliderPrimitive } from "./useRangeSliderPrimitive";

type RangeSliderPrimitiveVm = Omit<
    SliderPrimitives.SliderProps,
    "value" | "min" | "max" | "onValueChange" | "onValueCommit"
> & {
    values: number[];
    min: number;
    max: number;
};

type RangeSliderPrimitiveThumbsVm = Omit<SliderPrimitiveThumbProps, "value"> & {
    values: string[];
};

/**
 * RangeSliderRenderer
 */
interface RangeSliderPrimitiveRendererProps {
    sliderVm: RangeSliderPrimitiveVm;
    thumbsVm: RangeSliderPrimitiveThumbsVm;
    onValuesChange: (values: number[]) => void;
    onValuesCommit: (values: number[]) => void;
}

const DecoratableRangeSliderPrimitiveRenderer = ({
    sliderVm,
    thumbsVm,
    onValuesChange,
    onValuesCommit
}: RangeSliderPrimitiveRendererProps) => {
    return (
        <div className={"flex h-md w-full"}>
            <SliderPrimitiveRoot
                {...sliderVm}
                value={sliderVm.values}
                onValueChange={onValuesChange}
                onValueCommit={onValuesCommit}
            >
                <SliderPrimitiveTrack />
                <SliderPrimitiveThumb {...thumbsVm} value={thumbsVm.values[0]} />
                <SliderPrimitiveThumb {...thumbsVm} value={thumbsVm.values[1]} />
            </SliderPrimitiveRoot>
        </div>
    );
};

const RangeSliderPrimitiveRenderer = makeDecoratable(
    "RangeSliderPrimitiveRenderer",
    DecoratableRangeSliderPrimitiveRenderer
);

/**
 * RangeSlider
 */
interface RangeSliderPrimitiveProps
    extends Omit<
        SliderPrimitives.SliderProps,
        "defaultValue" | "value" | "onValueChange" | "onValueCommit"
    > {
    onValuesChange: (values: number[]) => void;
    onValuesCommit?: (values: number[]) => void;
    showTooltip?: boolean;
    tooltipSide?: "top" | "bottom";
    transformValues?: (value: number) => string;
    values?: number[] | undefined;
}

const DecoratableRangeSliderPrimitive = (props: RangeSliderPrimitiveProps) => {
    const { vm, changeValues, commitValues } = useRangeSliderPrimitive(props);

    return (
        <RangeSliderPrimitiveRenderer
            sliderVm={vm.sliderVm}
            thumbsVm={vm.thumbsVm}
            onValuesChange={changeValues}
            onValuesCommit={commitValues}
        />
    );
};

const RangeSliderPrimitive = makeDecoratable(
    "RangeSliderPrimitive",
    DecoratableRangeSliderPrimitive
);

export {
    RangeSliderPrimitive,
    RangeSliderPrimitiveRenderer,
    type RangeSliderPrimitiveProps,
    type RangeSliderPrimitiveVm,
    type RangeSliderPrimitiveThumbsVm
};
