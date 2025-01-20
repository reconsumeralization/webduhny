import React, { useCallback } from "react";
import styled from "@emotion/styled";
import capitalize from "lodash/capitalize";
import { ButtonPrimary } from "@webiny/ui/Button";
import { ReactComponent as InfoIcon } from "@webiny/app-admin/assets/icons/info.svg";
import type { PbEditorElement, PbBlockVariable } from "~/types";
import TextInput from "./TextInput";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import { ElementLinkStatusWrapper } from "./ElementNotLinked";
import { useElementRendererInputs } from "~/blockEditor";
import { ElementInput } from "@webiny/app-page-builder-elements";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";

const FormWrapper = styled("div")({
    padding: "16px",
    display: "grid",
    rowGap: "16px"
});

type VariableInput = {
    id: string;
    input: ElementInput;
    variable?: PbBlockVariable;
    label: string;
    enabled: boolean;
};

class PbBlockVariableId {
    static create(variable: PbBlockVariable) {
        return `${variable.blockId}/${variable.elementId}/${variable.inputName}`;
    }
}

const useVariableInputs = (
    element: PbEditorElement,
    inputs: ElementInput[],
    variables: PbBlockVariable[]
) => {
    return inputs.reduce<VariableInput[]>((acc, input) => {
        const variable = variables.find(v => v.inputName === input.getName());

        return [
            ...acc,
            {
                id: `${element.id}/${input.getName()}`,
                input,
                variable,
                label: variable?.label ?? capitalize(input.getName()),
                enabled: !!variable
            }
        ];
    }, []);
};

export interface VariableSettingsProps {
    element: PbEditorElement;
    variables: PbBlockVariable[];
}

const VariableSettings = ({ element, variables }: VariableSettingsProps) => {
    const { inputs } = useElementRendererInputs(element);
    const { removeBlockVariables, updateBlockVariables } = useBlockVariables();
    const variableInputs = useVariableInputs(element, inputs, variables);

    const updateVariable = useCallback(
        (variable: PbBlockVariable, label: string) => {
            updateBlockVariables(variables => {
                return variables.map(existing => {
                    if (PbBlockVariableId.create(existing) === PbBlockVariableId.create(variable)) {
                        return { ...existing, label };
                    }
                    return existing;
                });
            });
        },
        [element, updateBlockVariables]
    );

    const { showConfirmation } = useConfirmationDialog({
        title: "Remove variable",
        message: <p>Are you sure you want to remove element variable?</p>
    });

    const unlinkElement = useCallback(
        () =>
            showConfirmation(() => {
                removeBlockVariables(element);
            }),
        [element]
    );

    return (
        <>
            <FormWrapper>
                {variableInputs.map(variableInput => (
                    <TextInput
                        key={variableInput.id}
                        label={`${variableInput.input.getName()} Input Label`}
                        value={variableInput.label}
                        onChange={value => updateVariable(variableInput.variable!, value)}
                    />
                ))}
            </FormWrapper>
            <ElementLinkStatusWrapper>
                <strong>Element is linked</strong>
                To prevent users from changing the value of this element, you need to unlink it from
                variables.
                <ButtonPrimary onClick={unlinkElement}>Unlink Element</ButtonPrimary>
                <div className="info-wrapper">
                    <InfoIcon /> Click here to learn more about how block variables work
                </div>
            </ElementLinkStatusWrapper>
        </>
    );
};

export default VariableSettings;
