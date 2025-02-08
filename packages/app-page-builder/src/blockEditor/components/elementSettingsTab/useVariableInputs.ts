import type { PbBlockVariable, PbEditorElement } from "~/types";
import type { ElementInput } from "@webiny/app-page-builder-elements";

export type VariableInput = {
    id: string;
    input: ElementInput;
    variable?: PbBlockVariable;
    label: string;
    enabled: boolean;
};

export const useVariableInputs = (
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
                label: variable?.label ?? "",
                enabled: !!variable
            }
        ];
    }, []);
};
