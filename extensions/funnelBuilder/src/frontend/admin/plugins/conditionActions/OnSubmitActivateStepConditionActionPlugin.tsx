import React from "react";
import {
    ConditionActionParamsComponent,
    PbEditorFunnelConditionActionPlugin
} from "../PbEditorFunnelConditionActionPlugin";
import { OnSubmitActivateStepConditionAction } from "../../../../shared/models/conditionActions/OnSubmitActivateStepConditionAction";
import { Bind } from "@webiny/form";
import { Select } from "@webiny/ui/Select";

const ActionSettings: ConditionActionParamsComponent = ({ funnel }) => {
    return (
        <Bind name={"extra.targetStepId"}>
            <Select placeholder={"Select target step..."} size={"small"}>
                {funnel.steps.map(step => (
                    <option key={step.id} value={step.id}>
                        {step.title}
                    </option>
                ))}
            </Select>
        </Bind>
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
