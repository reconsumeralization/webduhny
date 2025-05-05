import { type FunnelConditionActionModelDto } from "../FunnelConditionActionModel";
import { DisableFieldConditionAction } from "./DisableFieldConditionAction";
import { HideFieldConditionAction } from "./HideFieldConditionAction";
import { OnSubmitActivateStepConditionAction } from "./OnSubmitActivateStepConditionAction";
import { OnSubmitEndFunnelConditionAction } from "./OnSubmitEndFunnelConditionAction";

const registry = [
    DisableFieldConditionAction,
    HideFieldConditionAction,
    OnSubmitActivateStepConditionAction,
    OnSubmitEndFunnelConditionAction
];

export const listConditionActions = () => registry;

export const conditionActionFromDto = (dto: FunnelConditionActionModelDto) => {
    const ActionClass = registry.find(actionClass => actionClass.type === dto.type);
    if (!ActionClass) {
        throw new Error(`Unknown condition action: ${dto.type}`);
    }
    return new ActionClass(dto);
};
