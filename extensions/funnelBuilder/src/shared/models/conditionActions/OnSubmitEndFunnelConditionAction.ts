import { FunnelConditionActionModel } from "../FunnelConditionActionModel";

interface OnSubmitEndFunnelConditionActionExtraParams {
    targetStepId?: number;
}

export class OnSubmitEndFunnelConditionAction extends FunnelConditionActionModel<OnSubmitEndFunnelConditionActionExtraParams> {
    static override type = "onSubmitEndFunnel";
    static override optionLabel = "End funnel";

    constructor() {
        super({
            type: "onSubmitEndFunnel"
        });
    }
}
