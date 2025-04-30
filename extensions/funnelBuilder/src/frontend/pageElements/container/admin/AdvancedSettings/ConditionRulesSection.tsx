import React from "react";
import styled from "@emotion/styled";
import { ButtonSecondary } from "@webiny/ui/Button";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { useDisclosure } from "../../../../admin/useDisclosure";
import {
    useActiveElementId,
    useElementById,
    useElementWithChildren,
    useUpdateElement
} from "@webiny/app-page-builder/editor";
import { ContainerElementWithChildren } from "../../types";
import { ConditionRulesDialog } from "./ConditionRulesSection/ConditionRulesDialog";
import { FunnelConditionRuleModelDto } from "../../../../../shared/models/FunnelConditionRuleModel";

const EditConditionRulesButton = styled(ButtonSecondary)`
    display: block;
    margin: 4px auto;
`;

export const ConditionRulesSection = () => {
    const [activeElementId] = useActiveElementId();
    const containerElementWithChildren = useElementWithChildren(
        activeElementId!
    ) as ContainerElementWithChildren;

    const [editorElement] = useElementById(activeElementId);
    const updateElement = useUpdateElement();

    const {
        open: showConditionRulesDialog,
        close: hideConditionRulesDialog,
        isOpen: isConditionRulesDialogShown,
        data: conditionRules
    } = useDisclosure<FunnelConditionRuleModelDto[]>();

    return (
        <Accordion title={"Conditional Rules"} defaultValue={true}>
            <>
                <EditConditionRulesButton
                    onClick={() => {
                        const conditionRulesClone = structuredClone(
                            containerElementWithChildren.data.conditionRules
                        );
                        showConditionRulesDialog(conditionRulesClone);
                    }}
                >
                    Edit Conditional Rules
                </EditConditionRulesButton>

                <ConditionRulesDialog
                    open={isConditionRulesDialogShown}
                    conditionRules={conditionRules!}
                    onClose={hideConditionRulesDialog}
                    onSubmit={data => {
                        updateElement({ ...editorElement!, data }, { history: false });
                        hideConditionRulesDialog();
                    }}
                />
            </>
        </Accordion>
    );
};
