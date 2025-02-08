import React, { useCallback } from "react";
import type { Element } from "@webiny/app-page-builder-elements/types";
import { useActiveElement } from "~/editor/hooks/useActiveElement";
import { useCurrentBlockElement } from "~/editor/hooks/useCurrentBlockElement";
import { useElementRendererInputs } from "~/blockEditor";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";
import type { PbBlockVariable, PbDataBinding, PbEditorElement } from "~/types";
import { useDynamicDocument } from "~/dataInjection";

interface CreateVariableActionPropsType {
    children: React.ReactElement;
}

const variableToId = (v: PbBlockVariable) => {
    return `${v.blockId};${v.elementId};${v.inputName}`;
};

const CreateVariableAction = ({ children }: CreateVariableActionPropsType) => {
    const [element] = useActiveElement<PbEditorElement>();
    const { inputs } = useElementRendererInputs(element);
    const { block } = useCurrentBlockElement();
    const { updateVariables } = useBlockVariables();
    const { updateDataBindings } = useDynamicDocument();

    const onClick = useCallback((): void => {
        if (!block) {
            return;
        }

        const newVariables: PbBlockVariable[] = [];
        const newBindings: PbDataBinding[] = [];

        for (const input of inputs) {
            newVariables.push({
                blockId: block.id,
                elementId: element.id,
                label: input.getName(),
                inputName: input.getName()
            });

            newBindings.push({
                dataSource: "static",
                bindFrom: input.getDefaultValue(element as Element),
                bindTo: `element:${element.id}.${input.getName()}`
            });
        }

        updateVariables(variables => {
            const existingVarsIds = variables.map(variableToId);

            return [
                ...variables,
                ...newVariables.filter(v => !existingVarsIds.includes(variableToId(v)))
            ];
        });

        updateDataBindings(bindings => {
            return [...bindings, ...newBindings];
        });
    }, [element, block]);

    return React.cloneElement(children, { onClick });
};

export default React.memo(CreateVariableAction);
