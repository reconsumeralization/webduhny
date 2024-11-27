import * as React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import { RangeSliderPrimitiveProps, RangeSliderPrimitiveRenderer } from "./RangeSliderPrimitive";
import { useRangeSlider } from "./useRangeSlider";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type RangeSliderLabelVm = {
    label: React.ReactNode;
    values: string[];
};

/**
 * Range Slider Value
 */
interface RangeSliderValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    value: string;
}

const RangeSliderBaseValue = (props: RangeSliderValueProps) => (
    <span className={"font-normal text-sm leading-none"}>{props.value}</span>
);

const RangeSliderValue = makeDecoratable("RangeSliderValue", RangeSliderBaseValue);

interface RangeSliderProps extends RangeSliderPrimitiveProps, FormComponentProps {
    label: React.ReactNode;
    valueConverter?: (value: number) => string;
}

const DecoratableRangeSlider = (props: RangeSliderProps) => {
    const { vm, changeValues, commitValues } = useRangeSlider(props);

    return (
        <FormComponent
            required={props.required}
            label={vm.labelVm.label}
            note={props.note}
            description={props.description}
            validate={props.validate}
            validation={props.validation}
        >
            <div className={"flex flex-row items-center justify-between"}>
                <div className={"basis-1/12 pr-xxs"}>
                    <RangeSliderValue value={vm.labelVm.values[0]} />
                </div>
                <div className={"basis-10/12"}>
                    <RangeSliderPrimitiveRenderer
                        sliderVm={vm.sliderVm}
                        thumbsVm={vm.thumbsVm}
                        onValuesChange={changeValues}
                        onValuesCommit={commitValues}
                    />
                </div>
                <div className={"basis-1/12 pl-xxs text-right"}>
                    <RangeSliderValue value={vm.labelVm.values[1]} />
                </div>
            </div>
        </FormComponent>
    );
};

const RangeSlider = makeDecoratable("RangeSlider", DecoratableRangeSlider);

export { RangeSlider, type RangeSliderProps, type RangeSliderLabelVm };
