import React from "react";
import { useActiveElement } from "~/editor/hooks/useActiveElement";
import { ElementNotLinked } from "~/blockEditor/components/elementSettingsTab/ElementNotLinked";
import { VariableSettings } from "~/blockEditor/components/elementSettingsTab/VariableSettings";
import { VariablesList } from "~/blockEditor/components/elementSettingsTab/VariablesList";
import { EditorConfig } from "~/editor/config";
import { useElementRendererInputs, useElementVariables } from "~/blockEditor";

export const ElementSettingsDecorator = EditorConfig.Ui.Sidebar.Elements.createDecorator(
    Original => {
        return function ElementGroup(props) {
            const [element] = useActiveElement();
            const { inputs } = useElementRendererInputs(element?.type);
            const { variables } = useElementVariables(element);

            if (props.group !== "element" || !element) {
                return <Original {...props} />;
            }

            const canHaveVariable = inputs.length > 0;
            const hasVariable = variables.length > 0;
            const isBlock = element && element.type === "block";

            return (
                <>
                    {isBlock ? <VariablesList variables={variables} /> : <Original {...props} />}
                    {canHaveVariable && !hasVariable && <ElementNotLinked />}
                    {!isBlock && hasVariable && <VariableSettings element={element} variables={variables} />}
                </>
            );
        };
    }
);
