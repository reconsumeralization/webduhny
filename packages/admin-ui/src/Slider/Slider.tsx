import * as React from "react";
import { Label } from "~/Label";
import { cn, cva, VariantProps, makeDecoratable } from "~/utils";
import {
    SliderPrimitiveRenderer,
    SliderPrimitiveProps,
    SliderPrimitiveRendererProps
} from "~/Slider";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";
import { useSlider } from "~/Slider/useSlider";

/**
 * Slider Value
 */
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

const DecoratableSliderValue = ({ value, disabled, className }: SliderValueProps) => {
    if (!value) {
        return null;
    }
    return <span className={cn(sliderValueVariants({ disabled }), className)}>{value}</span>;
};
const SliderValue = makeDecoratable("SliderValue", DecoratableSliderValue);

/**
 * Slider Renderer with side label
 */
interface SliderRendererWithSideValueProps extends SliderPrimitiveRendererProps {
    label?: React.ReactNode;
    required?: boolean;
}

const DecoratableSliderRendererWithSideValue = (props: SliderRendererWithSideValueProps) => {
    return (
        <div className={"wby-w-full wby-flex wby-flex-row wby-items-center wby-justify-between"}>
            <div className={"wby-basis-2/12 wby-pr-sm"}>
                <Label
                    text={props.label}
                    required={props.required}
                    disabled={props.disabled}
                    weight={"light"}
                />
            </div>
            <div className={"wby-basis-9/12"}>
                <SliderPrimitiveRenderer {...props} />
            </div>
            <div className={"wby-basis-1/12 wby-pl-sm wby-text-right"}>
                <SliderValue value={props.textValue} disabled={props.disabled} />
            </div>
        </div>
    );
};
const SliderRendererWithSideValue = makeDecoratable(
    "SliderRendererWithSideValue",
    DecoratableSliderRendererWithSideValue
);

/**
 * Slider
 */
interface SliderProps extends FormComponentProps, SliderPrimitiveProps {
    labelPosition?: "top" | "side";
}

const DecoratableSlider = ({ description, note, validation, ...props }: SliderProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = React.useMemo(() => validationIsValid === false, [validationIsValid]);
    const { vm, changeValue, commitValue } = useSlider(props);

    if (props.labelPosition === "side") {
        return (
            <div className={"wby-w-full"}>
                <FormComponentDescription text={description} />
                <SliderRendererWithSideValue
                    {...props}
                    {...vm}
                    onValueChange={changeValue}
                    onValueCommit={commitValue}
                />
                <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
                <FormComponentNote text={note} />
            </div>
        );
    }

    return (
        <div className={"wby-w-full"}>
            <FormComponentLabel
                text={<Label text={props.label} value={vm.textValue} />}
                disabled={props.disabled}
                required={props.required}
            />
            <FormComponentDescription text={description} />
            <SliderPrimitiveRenderer
                {...props}
                {...vm}
                onValueChange={changeValue}
                onValueCommit={commitValue}
            />
            <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            <FormComponentNote text={note} />
        </div>
    );
};
const Slider = makeDecoratable("Slider", DecoratableSlider);

export { Slider, type SliderProps };
