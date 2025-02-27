import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@webiny/ui/Typography";
import { useElementRendererInputs } from "~/blockEditor/index.js";
import type { PbBlockVariable } from "~/types.js";

const InputContainer = styled.div`
    margin-bottom: 8px;
    & span {
        color: var(--mdc-theme-text-primary-on-background);
    }
`;

export interface VariableInputProps {
    variable: PbBlockVariable;
}

export const VariableInput = ({ variable }: VariableInputProps) => {
    const { inputs } = useElementRendererInputs(variable.elementType);
    const input = inputs.find(input => input.getName() === variable.inputName);

    if (!input) {
        return null;
    }

    return (
        <InputContainer>
            <Typography use={"body2"}>{variable.label}</Typography>
        </InputContainer>
    );
};
