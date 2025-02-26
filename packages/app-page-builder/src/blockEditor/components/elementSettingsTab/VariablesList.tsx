import React, { useCallback } from "react";
import styled from "@emotion/styled";
import type { PbBlockVariable } from "~/types";
import { Typography } from "@webiny/ui/Typography";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";
import { VariablesListItem } from "./VariablesListItem";

const TitleWrapper = styled("div")({
    padding: "16px",
    textAlign: "center"
});

export interface VariablesListProps {
    variables: PbBlockVariable[];
}

export const VariablesList = ({ variables }: VariablesListProps) => {
    const { moveVariable } = useBlockVariables();


    const onMove = useCallback(
        (currentIndex: number, newIndex: number) => {
            moveVariable(variables[currentIndex], newIndex);
        },
        [variables, moveVariable]
    );

    return (
        <>
            <TitleWrapper>
                <Typography use="headline6">Block variables</Typography>
            </TitleWrapper>
            {variables.map((variable, index) => (
                <VariablesListItem
                    key={index}
                    index={index}
                    variable={variable}
                    move={onMove}
                />
            ))}
        </>
    );
};
