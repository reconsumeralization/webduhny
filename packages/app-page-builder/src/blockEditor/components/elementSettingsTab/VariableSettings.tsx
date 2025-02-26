import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { ButtonPrimary } from "@webiny/ui/Button";
import { ReactComponent as InfoIcon } from "@webiny/app-admin/assets/icons/info.svg";
import type { PbEditorElement, PbBlockVariable } from "~/types";
import { TextInput } from "./TextInput";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import { ElementLinkStatusWrapper } from "./ElementNotLinked";
import { useElementRendererInputs } from "~/blockEditor";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";
import { useCurrentBlockElement } from "~/editor";
import { useToggleVariable } from "~/blockEditor/components/elementSettingsTab/useToggleVariable";
import { useVariableInputs } from "./useVariableInputs";

const FormWrapper = styled("div")({
    padding: "16px",
    display: "grid",
    rowGap: "16px"
});

class PbBlockVariableId {
    static create(variable: PbBlockVariable) {
        return `${variable.blockId}/${variable.elementId}/${variable.inputName}`;
    }
}

export interface VariableSettingsProps {
    element: PbEditorElement;
    variables: PbBlockVariable[];
}

export const VariableSettings = ({ element, variables }: VariableSettingsProps) => {
    const { inputs } = useElementRendererInputs(element.type);
    const { block } = useCurrentBlockElement();
    const { removeElementVariables, updateVariables } = useBlockVariables();
    const variableInputs = useVariableInputs(element, inputs, variables);
    const toggleVariable = useToggleVariable(block, element);

    const updateVariable = useCallback(
        (variable: PbBlockVariable, label: string) => {
            updateVariables(variables => {
                return variables.map(existing => {
                    if (PbBlockVariableId.create(existing) === PbBlockVariableId.create(variable)) {
                        return { ...existing, label };
                    }
                    return existing;
                });
            });
        },
        [element, updateVariables]
    );

    const { showConfirmation } = useConfirmationDialog({
        title: "Remove variable",
        message: <p>Are you sure you want to remove element variable?</p>
    });

    const unlinkElement = useCallback(
        () =>
            showConfirmation(() => {
                removeElementVariables(element);
            }),
        [element, removeElementVariables]
    );

    return (
        <>
            <FormWrapper>
                {variableInputs.map(variableInput => (
                    <TextInput
                        key={variableInput.id}
                        disabled={!variableInput.enabled}
                        label={`${variableInput.input.getName()} Variable Label`}
                        value={variableInput.label}
                        onChange={value => updateVariable(variableInput.variable!, value)}
                        onToggleDisabled={() => toggleVariable(variableInput)}
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
