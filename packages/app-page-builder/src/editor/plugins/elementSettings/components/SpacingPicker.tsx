import React, { useCallback, useMemo } from "react";
import { FormElementMessage } from "@webiny/ui/FormElementMessage";
import { BindComponentRenderPropValidation, Form, FormOnSubmit } from "@webiny/form";
import InputField from "./InputField";
import SelectField from "./SelectField";

interface SpacingPickerProps {
    value: string;
    onChange: (value: string | number) => void;
    options: any[];
    disabled?: boolean;
    useDefaultStyle?: boolean;
    validation?: BindComponentRenderPropValidation;
    className?: string;
    inputClassName?: string;
    selectClassName?: string;
}

interface SpacingPickerFormData {
    unit: string;
    value: string | number;
}

const SpacingPicker = ({
    value = "",
    onChange,
    disabled,
    options = [],
    validation,
    className
}: SpacingPickerProps) => {
    const formData = useMemo(() => {
        const parsedValue = parseFloat(value);
        const regx = new RegExp(`[0-9.+-]+`, "g");
        const unit = value.replace(regx, "");

        if (Number.isNaN(parsedValue) && unit === "auto") {
            return {
                value: "",
                unit
            };
        }
        return {
            value: parsedValue,
            unit
        };
    }, [value]);

    const defaultUnitValue = options[0] ? options[0].value : "";

    const onFormChange: FormOnSubmit<SpacingPickerFormData> = useCallback(
        formData => {
            if (formData.unit === "auto") {
                onChange(formData.unit);
                return;
            }
            onChange(formData.value + (formData.unit || defaultUnitValue));
        },
        [defaultUnitValue, onChange]
    );

    return (
        <Form<SpacingPickerFormData> data={formData} onChange={onFormChange}>
            {({ data, Bind }) => {
                const unitValue = data.unit || defaultUnitValue;
                return (
                    <div className={className}>
                        <div className={"wby-flex"}>
                            <div className={"wby-w-[68px]"}>
                                <Bind name={"value"}>
                                    <InputField
                                        disabled={data.unit === "auto" || disabled}
                                        type={"number"}
                                        onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                                            event.target.select()
                                        }
                                        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                                            if (event.target.value === "") {
                                                onChange("0" + (formData.unit || defaultUnitValue));
                                            }
                                        }}
                                    />
                                </Bind>
                            </div>
                            &nbsp;
                            <div className={"wby-w-[70px]"}>
                                <Bind name={"unit"}>
                                    <SelectField
                                        displayResetAction={false}
                                        disabled={disabled}
                                        value={unitValue}
                                        options={options}
                                    />
                                </Bind>
                            </div>
                        </div>
                        {validation && validation.isValid === false && (
                            <FormElementMessage error>{validation.message}</FormElementMessage>
                        )}
                    </div>
                );
            }}
        </Form>
    );
};

export default React.memo(SpacingPicker);
