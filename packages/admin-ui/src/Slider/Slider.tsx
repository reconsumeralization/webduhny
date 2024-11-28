import * as React from "react";
import { Label } from "~/Label";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";
import {
    SliderPrimitiveRenderer,
    SliderPrimitiveProps,
    SliderPrimitiveVm,
    SliderPrimitiveThumbProps
} from "~/Slider";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";
import { useSlider } from "./useSlider";

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
const DecoratableSlider = ({ description, note, required, validation, ...props }: SliderProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = React.useMemo(() => validationIsValid === false, [validationIsValid]);
    const { vm, changeValue, commitValue } = useSlider(props);

    if (vm.labelVm.position === "side") {
        return (
            <div className={"w-full"}>
                <FormComponentDescription text={description} />
                <SliderWithSideValue
                    sliderVm={vm.sliderVm}
                    thumbVm={vm.thumbVm}
                    labelVm={vm.labelVm}
                    onValueChange={changeValue}
                    onValueCommit={commitValue}
                />
                <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
                <FormComponentNote text={note} />
            </div>
        );
    }

    return (
        <div className={"w-full"}>
            <FormComponentLabel
                text={vm.labelVm.label}
                required={required}
                disabled={props.disabled}
            />
            <FormComponentDescription text={description} />
            <SliderWithTopValue
                sliderVm={vm.sliderVm}
                thumbVm={vm.thumbVm}
                labelVm={vm.labelVm}
                onValueChange={changeValue}
                onValueCommit={commitValue}
            />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};

const Slider = makeDecoratable("Slider", DecoratableSlider);

export { Slider, type SliderProps, type SliderLabelVm };
