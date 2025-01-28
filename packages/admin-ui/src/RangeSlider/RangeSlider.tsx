import * as React from "react";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";
import { RangeSliderPrimitiveProps, RangeSliderPrimitiveRenderer } from "./RangeSliderPrimitive";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";
import { useRangeSlider } from "~/RangeSlider/useRangeSlider";

/**
 * Range Slider Value
 */
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

const DecoratableRangeSliderValue = ({ value, disabled, className }: RangeSliderValueProps) => {
    if (!value) {
        return null;
    }
    return <span className={cn(rangeSliderValueVariants({ disabled }), className)}>{value}</span>;
};

const RangeSliderValue = makeDecoratable("RangeSliderValue", DecoratableRangeSliderValue);

interface RangeSliderProps extends RangeSliderPrimitiveProps, FormComponentProps {
    label: React.ReactNode;
    valueConverter?: (value: number) => string;
}

const DecoratableRangeSlider = (props: RangeSliderProps) => {
    const { isValid: validationIsValid, message: validationMessage } = props.validation || {};
    const invalid = React.useMemo(() => validationIsValid === false, [validationIsValid]);
    const { vm, changeValues, commitValues } = useRangeSlider(props);

    return (
        <div className={"wby-w-full"}>
            <FormComponentLabel
                text={props.label}
                required={props.required}
                disabled={props.disabled}
            />
            <FormComponentDescription text={props.description} />
            <div className={"wby-flex wby-flex-row wby-items-center wby-justify-between"}>
                <div className={"wby-basis-1/12 wby-pr-xxs"}>
                    <RangeSliderValue value={vm.textValues[0]} disabled={props.disabled} />
                </div>
                <div className={"wby-basis-10/12"}>
                    <RangeSliderPrimitiveRenderer
                        {...props}
                        {...vm}
                        onValueChange={changeValues}
                        onValueCommit={commitValues}
                    />
                </div>
                <div className={"wby-basis-1/12 wby-pl-xxs wby-text-right"}>
                    <RangeSliderValue value={vm.textValues[1]} disabled={props.disabled} />
                </div>
            </div>
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={props.note} />
        </div>
    );
};

const RangeSlider = makeDecoratable("RangeSlider", DecoratableRangeSlider);

export { RangeSlider, type RangeSliderProps };
