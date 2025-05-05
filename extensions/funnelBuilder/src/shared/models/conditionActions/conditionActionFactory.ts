import {
    FunnelConditionActionModel,
    type FunnelConditionActionModelDto
} from "../FunnelConditionActionModel";
import { DisableFieldConditionAction } from "./DisableFieldConditionAction";
import { HideFieldConditionAction } from "./HideFieldConditionAction";
import { OnSubmitActivateStepConditionAction } from "./OnSubmitActivateStepConditionAction";
import { OnSubmitEndFunnelConditionAction } from "./OnSubmitEndFunnelConditionAction";
import { FunnelConditionRuleModel } from "../FunnelConditionRuleModel";

const registry = [
    DisableFieldConditionAction,
    HideFieldConditionAction,
    OnSubmitActivateStepConditionAction,
    OnSubmitEndFunnelConditionAction
] as Array<typeof FunnelConditionActionModel>;

export const listConditionActions = () => registry;

export const conditionActionFromDto = (
    conditionRule: FunnelConditionRuleModel,
    dto: FunnelConditionActionModelDto
) => {
    const ActionClass = registry.find(actionClass => actionClass.type === dto.type);
    if (!ActionClass) {
        throw new Error(`Unknown condition action: ${dto.type}`);
    }
    return new ActionClass(conditionRule, dto);
};
