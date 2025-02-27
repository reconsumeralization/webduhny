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

const camelCaseToWords = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1").toLowerCase();
    return result.charAt(0).toUpperCase() + result.slice(1);
};

const LinkElement = ({ children }: CreateVariableActionPropsType) => {
    const [element] = useActiveElement<PbEditorElement>();
    const { inputs } = useElementRendererInputs(element?.type);
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
                elementType: element.type,
                label: camelCaseToWords(input.getName()),
                inputName: input.getName()
            });

            newBindings.push({
                dataSource: "default",
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

export default React.memo(LinkElement);
