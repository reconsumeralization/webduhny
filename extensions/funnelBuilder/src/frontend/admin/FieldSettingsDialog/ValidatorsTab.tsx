import React, { useCallback, useMemo } from "react";
import { plugins } from "@webiny/plugins";
import { Switch } from "@webiny/ui/Switch";
import {
    SimpleForm,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import {
    Bind,
    BindComponentRenderProp,
    BindComponentRenderPropOnChange,
    Form,
    useBind,
    useForm
} from "@webiny/form";
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { validation } from "@webiny/validation";
import { FunnelFieldDefinitionModel } from "../../../shared/models/FunnelFieldDefinitionModel";
import { PbEditorFunnelFieldValidatorPluginProps } from "../plugins/PbEditorFunnelFieldValidatorPlugin";
import { AbstractValidator } from "../../../shared/models/validators/AbstractValidator";
import { validatorFromDto } from "../../../shared/models/validators/validatorFactory";
import {help} from "yargs";

interface OnEnabledChangeParams {
    data: Record<string, string>;
    validationValue: any[];
    onChangeValidation: BindComponentRenderPropOnChange;
    validator: any;
}

const onEnabledChange = ({
    data,
    validationValue,
    onChangeValidation,
    validator
}: OnEnabledChangeParams): void => {
    if (data) {
        const index = validationValue.findIndex(item => item.name === validator.name);
        onChangeValidation([
            ...validationValue.slice(0, index),
            ...validationValue.slice(index + 1)
        ]);
        return;
    }
    onChangeValidation([
        ...validationValue,
        {
            name: validator.name,
            settings: validator.defaultSettings,
            message: validator.defaultMessage
        }
    ]);
};

interface OnFormChangeParams {
    data: Record<string, string>;
    validationValue: Record<string, any>;
    onChangeValidation: (value: Record<string, any>) => void;
    validatorIndex: number;
}

const onFormChange = debounce(
    ({ data, validationValue, onChangeValidation, validatorIndex }: OnFormChangeParams) => {
        const newValidationValue = cloneDeep(validationValue);
        newValidationValue[validatorIndex] = {
            ...newValidationValue[validatorIndex],
            ...cloneDeep(data)
        };
        onChangeValidation(newValidationValue);
    },
    200
);

interface ValidatorsTabProps {
    field: FunnelFieldDefinitionModel;
}

export const ValidatorsTab = (props: ValidatorsTabProps) => {
    console.log("renderimram ValidatorsTab");
    const { field } = props;

    const parentForm = useForm();
    const supportedValidators = useMemo<PbEditorFunnelFieldValidatorPluginProps[]>(() => {
        const fieldSupportedValidators = field.supportedValidatorTypes;
        if (!fieldSupportedValidators) {
            return [];
        }

        const validatorPlugins = plugins.byType(
            "pb-editor-funnel-field-validator"
        ) as unknown as PbEditorFunnelFieldValidatorPluginProps[];

        return validatorPlugins.filter(plugin => {
            return fieldSupportedValidators.includes(plugin.validatorType);
        });
    }, [field.supportedValidatorTypes]);

    const { value: validatorsValue, onChange: updateValidatorsValue } = useBind({
        name: "validators"
    }) as BindComponentRenderProp<AbstractValidator[]>;

    const toggleValidator = (validatorType: string) => {
        console.log(parentForm.data)
        const alreadyEnabled = validatorsValue.some(
            (item: AbstractValidator) => item.type === validatorType
        );

        if (alreadyEnabled) {
            console.log("REMOVING", [...validatorsValue.filter(item => item.type !== validatorType)]);
            updateValidatorsValue([...validatorsValue.filter(item => item.type !== validatorType)]);
        } else {
            console.log("ADDING", [
                ...validatorsValue,
                { type: validatorType }
            ]);
            updateValidatorsValue([...validatorsValue, { type: validatorType }]);
        }
    };

    return (
        <>
            {supportedValidators.map(validatorPlugin => {
                const validator = validatorsValue.find(
                    item => item.type === validatorPlugin.validatorType
                );

                console.log("validatorsNadjen", validator);

                return (
                    <SimpleForm key={validatorPlugin.validatorType}>
                        <SimpleFormHeader title={validatorPlugin.label}>
                            <Switch
                                label="Enabled"
                                value={!!validator}
                                onChange={() => toggleValidator(validatorPlugin.validatorType)}
                            />
                        </SimpleFormHeader>
                        {validator && (
                            <Form
                                data={validator}
                                onChange={
                                    data => {}
                                    // onFormChange({
                                    //     data,
                                    //     validationValue: validatorsValue,
                                    //     onChangeValidation: validatorsValueOnChange,
                                    //     validatorIndex
                                    // })
                                }
                            >
                                {({ Bind, setValue }) => {
                                    const { settingsRenderer: SettingsRendererComponent } =
                                        validatorPlugin;
                                    return (
                                        <SimpleFormContent>
                                            <Grid>
                                                <Cell span={12}>
                                                    <Bind
                                                        name={"message"}
                                                        validators={validation.create("required")}
                                                    >
                                                        <Input
                                                            label={"Message"}
                                                            description={
                                                                "This message will be displayed to the user"
                                                            }
                                                        />
                                                    </Bind>
                                                </Cell>
                                            </Grid>

                                            {SettingsRendererComponent && (
                                                <SettingsRendererComponent
                                                    field={field}
                                                    setMessage={message =>
                                                        setValue("message", message)
                                                    }
                                                />
                                            )}
                                        </SimpleFormContent>
                                    );
                                }}
                            </Form>
                        )}
                    </SimpleForm>
                );
            })}
        </>
    );
};
