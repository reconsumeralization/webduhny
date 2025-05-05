import { FunnelConditionActionModel } from "../FunnelConditionActionModel";
import { FunnelConditionRuleModel } from "../FunnelConditionRuleModel";

interface OnSubmitEndFunnelConditionActionExtraParams {
    targetStepId: string;
    evaluationStep: string;
}

export class OnSubmitEndFunnelConditionAction extends FunnelConditionActionModel<OnSubmitEndFunnelConditionActionExtraParams> {
    static override type = "onSubmitEndFunnel";
    static override optionLabel = "End funnel";

    constructor(conditionRule: FunnelConditionRuleModel) {
        super(conditionRule, {
            type: "onSubmitEndFunnel"
        });
    }

    override getEvaluationStep() {
        const evaluationStep = this.params.extra.evaluationStep;
        return this.conditionRule.funnel.steps.find(s => s.id === evaluationStep);
    }
}
