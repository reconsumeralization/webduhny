import React from "react";
import { css } from "emotion";
import { VariableInput } from "./VariableInput.js";
import { useActiveElement } from "~/editor/hooks/useActiveElement";
import { PbEditorElement } from "~/types";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";

const wrapperStyle = css({
    padding: "16px",
    display: "grid",
    rowGap: "20px"
});

export const VariableSettings = () => {
    const [element] = useActiveElement<PbEditorElement>();
    const { blockVariables } = useBlockVariables();

    const variables = blockVariables.filter(blockVariable => {
        return blockVariable.blockId === element.id;
    });

    return (
        <div className={wrapperStyle}>
            {variables.map(variable => (
                <VariableInput
                    key={[variable.elementId, variable.inputName].join(":")}
                    variable={variable}
                />
            ))}
        </div>
    );
};
