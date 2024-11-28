import * as React from "react";
import { Label } from "~/Label";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";
import {
    SliderPrimitiveRenderer,
    SliderPrimitiveProps,
    SliderPrimitiveVm,
    SliderPrimitiveThumbProps
} from "~/Slider";
import { useSlider } from "./useSlider";
import { FormComponent, FormComponentProps } from "~/FormComponent";

type LabelPosition = "top" | "side";

type SliderLabelVm = {
    label: React.ReactNode;
    position: LabelPosition;
    value: string;
    required: boolean;
};

/**
 * Slider Value
 */
const sliderValueVariants = cva("font-normal text-sm leading-none", {
    variants: {
        disabled: {
            true: "text-neutral-disabled cursor-not-allowed"
        }
    }
});

interface SliderValueProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof sliderValueVariants> {
    value?: SliderLabelVm["value"];
}

const DecoratableSliderValue = ({ value, disabled, className }: SliderValueProps) => {
    if (!value) {
        return null;
    }
    return <span className={cn(sliderValueVariants({ disabled }), className)}>{value}</span>;
};

const SliderValue = makeDecoratable("SliderValue", DecoratableSliderValue);

type SliderProps = SliderPrimitiveProps &
    FormComponentProps & {
        label: SliderLabelVm["label"];
        labelPosition?: LabelPosition;
    };

interface DecoratableSliderProps {
    sliderVm: SliderPrimitiveVm;
    thumbVm: SliderPrimitiveThumbProps;
    labelVm: SliderLabelVm;
    onValueChange: (values: number[]) => void;
    onValueCommit: (values: number[]) => void;
}

/**
 * Slider with top label
 */
const DecoratableSliderWithTopValue = ({
    sliderVm,
    thumbVm,
    onValueChange,
    onValueCommit
}: DecoratableSliderProps) => {
    return (
        <SliderPrimitiveRenderer
            sliderVm={sliderVm}
            thumbVm={thumbVm}
            onValueChange={onValueChange}
            onValueCommit={onValueCommit}
        />
    );
};
const SliderWithTopValue = makeDecoratable("SliderWithTopValue", DecoratableSliderWithTopValue);

/**
 * Slider with side label
 */
const DecoratableSliderWithSideValue = ({
    sliderVm,
    thumbVm,
    labelVm,
    onValueChange,
    onValueCommit
}: DecoratableSliderProps) => {
    return (
        <div className={"w-full flex flex-row items-center justify-between"}>
            <div className={"basis-2/12 pr-sm"}>
                <Label
                    text={labelVm.label}
                    required={labelVm.required}
                    disabled={sliderVm.disabled}
                    weight={"light"}
                />
            </div>
            <div className={"basis-9/12"}>
                <SliderPrimitiveRenderer
                    sliderVm={sliderVm}
                    thumbVm={thumbVm}
                    onValueChange={onValueChange}
                    onValueCommit={onValueCommit}
                />
            </div>
            {labelVm.value && (
                <div className={"basis-1/12 pl-sm text-right"}>
                    <SliderValue value={labelVm.value} disabled={sliderVm.disabled} />
                </div>
            )}
        </div>
    );
};
const SliderWithSideValue = makeDecoratable("SliderWithSideValue", DecoratableSliderWithSideValue);

/**
 * Slider
 */
const DecoratableSlider = (props: SliderProps) => {
    const { vm, changeValue, commitValue } = useSlider(props);

    if (vm.labelVm.position === "side") {
        return (
            <FormComponent
                required={props.required}
                note={props.note}
                description={props.description}
                disabled={props.disabled}
                validate={props.validate}
                validation={props.validation}
            >
                <SliderWithSideValue
                    sliderVm={vm.sliderVm}
                    thumbVm={vm.thumbVm}
                    labelVm={vm.labelVm}
                    onValueChange={changeValue}
                    onValueCommit={commitValue}
                />
            </FormComponent>
        );
    }

    return (
        <FormComponent
            label={<Label text={vm.labelVm.label} value={vm.labelVm.value} />}
            required={props.required}
            disabled={props.disabled}
            note={props.note}
            description={props.description}
            validate={props.validate}
            validation={props.validation}
        >
            <SliderWithTopValue
                sliderVm={vm.sliderVm}
                thumbVm={vm.thumbVm}
                labelVm={vm.labelVm}
                onValueChange={changeValue}
                onValueCommit={commitValue}
            />
        </FormComponent>
    );
};

const Slider = makeDecoratable("Slider", DecoratableSlider);

export { Slider, type SliderProps, type SliderLabelVm };
