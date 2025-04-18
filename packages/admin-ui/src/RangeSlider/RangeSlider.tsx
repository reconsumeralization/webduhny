import * as React from "react";
import { makeDecoratable } from "~/utils";
import {
    RangeSliderPrimitiveProps,
    RangeSliderPrimitiveRenderer,
    RangeSliderValue,
    useRangeSlider
} from "./primitives";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentNote,
    FormComponentProps
} from "~/FormComponent";

type RangeSliderProps = RangeSliderPrimitiveProps &
    FormComponentProps & {
        label: React.ReactNode;
        valueConverter?: (value: number) => string;
    };

const DecoratableRangeSlider = ({ description, note, validation, ...props }: RangeSliderProps) => {
    const { isValid: validationIsValid, message: validationMessage } = validation || {};
    const invalid = React.useMemo(() => validationIsValid === false, [validationIsValid]);
    const { onValuesChange, onValuesCommit, ...restProps } = props;
    const { vm, changeValues, commitValues } = useRangeSlider({
        ...restProps,
        onValuesChange,
        onValuesCommit
    });

    return (
        <div className={"wby-w-full"}>
            <FormComponentLabel
                text={props.label}
                required={props.required}
                disabled={props.disabled}
                invalid={invalid}
            />
            <FormComponentDescription text={description} disabled={props.disabled} />
            <div className={"wby-flex wby-flex-row wby-items-center wby-justify-between"}>
                <div className={"wby-basis-1/12 wby-pr-xxs"}>
                    <RangeSliderValue value={vm.textValues[0]} disabled={props.disabled} />
                </div>
                <div className={"wby-basis-10/12"}>
                    <RangeSliderPrimitiveRenderer
                        {...restProps}
                        {...vm}
                        onValueChange={changeValues}
                        onValueCommit={commitValues}
                    />
                </div>
                <div className={"wby-basis-1/12 wby-pl-xxs wby-text-right"}>
                    <RangeSliderValue value={vm.textValues[1]} disabled={props.disabled} />
                </div>
            </div>
            <FormComponentErrorMessage
                text={validationMessage}
                invalid={invalid}
                disabled={props.disabled}
            />
            <FormComponentNote text={note} disabled={props.disabled} />
        </div>
    );
};

const RangeSlider = makeDecoratable("RangeSlider", DecoratableRangeSlider);

export { RangeSlider, type RangeSliderProps };
