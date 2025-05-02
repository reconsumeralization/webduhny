import { FunnelConditionOperatorModel, FunnelConditionOperatorModelDto } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

interface LteConditionOperatorExtraParams {
    threshold?: number;
}

export class LteConditionOperator extends FunnelConditionOperatorModel<LteConditionOperatorExtraParams, FunnelFieldValueModel<number>> {
    constructor(dto: FunnelConditionOperatorModelDto<LteConditionOperatorExtraParams>) {
        super({
            id: "lte",
            params: {
                extra: {
                    threshold: dto.params?.extra?.threshold
                }
            }
        });
    }

    override evaluate(value: FunnelFieldValueModel<number>): boolean {
        if (!this.params.extra.threshold) {
            return true;
        }

        return value.exists() && value.value <= this.params.extra.threshold;
    }
}