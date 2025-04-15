import React from "react";
import styled from "@emotion/styled";
import { ButtonSecondary } from "@webiny/ui/Button";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { useConditionalRulesDialog } from "./ConditionalRulesSection/useConditionalRulesDialog";

const EditConditionalRulesButton = styled(ButtonSecondary)`
    display: block;
    margin: 4px auto;
`;

export const ConditionalRulesSection = () => {
    const { showDialog: showConditionalRulesDialog } = useConditionalRulesDialog();

    return (
        <Accordion title={"Conditional Rules"} defaultValue={true}>
            <EditConditionalRulesButton onClick={showConditionalRulesDialog}>
                Edit Conditional Rules
            </EditConditionalRulesButton>
        </Accordion>
    );
};
