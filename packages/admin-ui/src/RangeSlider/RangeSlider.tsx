import * as React from "react";
import {
    RangeSliderPrimitive,
    RangeSliderPrimitiveProps,
    RangeSliderPrimitiveRenderer
} from "./RangeSliderPrimitive";
import { useRangeSlider } from "./useRangeSlider";
import { FormComponent, FormComponentProps } from "~/FormComponent";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";

type RangeSliderLabelVm = {
    label: React.ReactNode;
    values: string[];
};

/**
 * Range Slider Value
 */
const rangeSliderValueVariants = cva("font-normal text-sm leading-none", {
    variants: {
        disabled: {
            true: "text-neutral-disabled cursor-not-allowed"
        }
    }
});

interface RangeSliderValueProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof rangeSliderValueVariants> {
    value: string;
}

const DecoratableRangeSliderValue = ({ value, disabled, className }: RangeSliderValueProps) => {
    if (!value) {
        return null;
    }
    return <span className={cn(rangeSliderValueVariants({ disabled }), className)}>{value}</span>;
};

const RangeSliderValue = makeDecoratable("RangeSliderValue", DecoratableRangeSliderValue);

interface RangeSliderProps
    extends RangeSliderPrimitiveProps,
        FormComponentProps<typeof RangeSliderPrimitive> {
    label: React.ReactNode;
    valueConverter?: (value: number) => string;
}

const DecoratableRangeSlider = (props: RangeSliderProps) => {
    const { vm, changeValues, commitValues } = useRangeSlider(props);

    return (
        <FormComponent
            required={props.required}
            disabled={props.disabled}
            label={vm.labelVm.label}
            note={props.note}
            description={props.description}
            validate={props.validate}
            validation={props.validation}
            element={
                <div className={"flex flex-row items-center justify-between"}>
                    <div className={"basis-1/12 pr-xxs"}>
                        <RangeSliderValue value={vm.labelVm.values[0]} disabled={props.disabled} />
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
                        <RangeSliderValue value={vm.labelVm.values[1]} disabled={props.disabled} />
                    </div>
                </div>
            }
        ></FormComponent>
    );
};

const RangeSlider = makeDecoratable("RangeSlider", DecoratableRangeSlider);

export { RangeSlider, type RangeSliderProps, type RangeSliderLabelVm };
