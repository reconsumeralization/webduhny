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

const VariablesList = ({ variables }: VariablesListProps) => {
    const { moveBlockVariable } = useBlockVariables();


    const onMove = useCallback(
        (currentIndex: number, newIndex: number) => {
            moveBlockVariable(variables[currentIndex], newIndex);
        },
        [variables, moveBlockVariable]
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

export default VariablesList;
