import React from "react";
import {
    ConditionActionParamsComponent,
    PbEditorFunnelConditionActionPlugin
} from "../PbEditorFunnelConditionActionPlugin";
import { OnSubmitActivateStepConditionAction } from "../../../../shared/models/conditionActions/OnSubmitActivateStepConditionAction";
import { Bind } from "@webiny/form";
import { Select } from "@webiny/ui/Select";
import styled from "@emotion/styled";

const Wrapper = styled.div`
    display: flex;
    column-gap: 5px;
    max-width: 500px;
`;

const ActionSettings: ConditionActionParamsComponent = ({ funnel }) => {
    return (
        <Wrapper>
            <Bind name={"extra.targetStepId"}>
                <Select placeholder={"Select target step..."} size={"small"}>
                    {funnel.steps.map(step => (
                        <option key={step.id} value={step.id}>
                            {step.title}
                        </option>
                    ))}
                </Select>
            </Bind>
            <Bind name={"extra.evaluationStep"}>
                <Select placeholder={"Evaluate upon submitting step..."} size={"small"}>
                    {funnel.steps.map(step => (
                        <option key={step.id} value={step.id}>
                            {step.title}
                        </option>
                    ))}
                </Select>
            </Bind>
        </Wrapper>
    );
};

export const OnSubmitActivateStepConditionActionPlugin = () => {
    return (
        <PbEditorFunnelConditionActionPlugin
            actionClass={OnSubmitActivateStepConditionAction}
            settingsRenderer={ActionSettings}
        />
    );
};
