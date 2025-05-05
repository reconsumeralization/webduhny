import {
    FunnelConditionActionModel,
    FunnelConditionActionModelDto
} from "../FunnelConditionActionModel";

interface OnSubmitActivateStepConditionActionExtraParams {
    targetStepId?: number;
}

export class OnSubmitActivateStepConditionAction extends FunnelConditionActionModel<OnSubmitActivateStepConditionActionExtraParams> {
    static override type = "onSubmitActivateStep";
    static override optionLabel = "Go to step";

    constructor(dto: FunnelConditionActionModelDto<OnSubmitActivateStepConditionActionExtraParams>) {
        super({
            type: "onSubmitActivateStep",
            params: {
                extra: {
                    targetStepId: dto.params?.extra?.targetStepId
                }
            }
        });
    }
}
