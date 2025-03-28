import * as React from "react";
import { Label } from "~/Label";
import { makeDecoratable } from "~/utils";
import {
    SliderPrimitiveRenderer,
    SliderPrimitiveProps,
    SliderPrimitiveRendererProps,
    useSlider,
    SliderValue
} from "./primitives";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

/**
 * Slider Renderer with side label
 */
interface SliderRendererWithSideValueProps extends SliderPrimitiveRendererProps {
    label?: React.ReactNode;
    required?: boolean;
}

const SliderRendererWithSideValue = (props: SliderRendererWithSideValueProps) => {
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

/**
 * Slider
 */
type SliderProps = FormComponentProps &
    SliderPrimitiveProps & {
        labelPosition?: "top" | "side";
    };

const DecoratableSlider = ({
    description,
    note,
    validation,
    labelPosition,
    ...props
}: SliderProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = React.useMemo(() => validationIsValid === false, [validationIsValid]);

    const { vm, changeValue, commitValue } = useSlider(props);

    if (labelPosition === "side") {
        return (
            <div className={"wby-w-full"}>
                <FormComponentDescription text={description} disabled={props.disabled} />
                <SliderRendererWithSideValue
                    {...props}
                    {...vm}
                    onValueChange={changeValue}
                    onValueCommit={commitValue}
                />
                <FormComponentErrorMessage
                    text={validationMessage}
                    invalid={invalid}
                    disabled={props.disabled}
                />
                <FormComponentNote text={note} disabled={props.disabled} />
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
            <FormComponentDescription text={description} disabled={props.disabled} />
            <SliderPrimitiveRenderer
                {...props}
                {...vm}
                onValueChange={changeValue}
                onValueCommit={commitValue}
            />
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={props.disabled}
            />
            <FormComponentNote text={note} disabled={props.disabled} />
        </div>
    );
};
const Slider = makeDecoratable("Slider", DecoratableSlider);

export { Slider, type SliderProps };
