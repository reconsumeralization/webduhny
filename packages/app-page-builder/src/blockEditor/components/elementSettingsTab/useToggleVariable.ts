import { useCallback } from "react";
import type { PbEditorElement } from "~/types";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";
import type { VariableInput } from "./useVariableInputs";
import { useDynamicDocument } from "~/dataInjection";
import type { Element } from "@webiny/app-page-builder-elements/types";

export const useToggleVariable = (block: PbEditorElement | null, element: PbEditorElement) => {
    const { removeVariable, updateVariables } = useBlockVariables();
    const { updateDataBindings } = useDynamicDocument();

    return useCallback(
        (variableInput: VariableInput) => {
            if (!block) {
                return;
            }

            const { variable, input } = variableInput;

            if (!variable) {
                // When enabling, we create a new block variable.
                updateVariables(variables => {
                    return [
                        ...variables,
                        {
                            blockId: block.id,
                            elementId: element.id,
                            elementType: element.type,
                            label: input.getName(),
                            inputName: input.getName()
                        }
                    ];
                });

                updateDataBindings(bindings => {
                    return [
                        ...bindings,
                        {
                            dataSource: "static",
                            bindFrom: input.getDefaultValue(element as Element),
                            bindTo: `element:${element.id}.${input.getName()}`
                        }
                    ];
                });
                return;
            }

            // When removing a variable, data bindings are automatically removed.
            removeVariable(variable);
        },
        [block, element, updateVariables, removeVariable]
    );
};
