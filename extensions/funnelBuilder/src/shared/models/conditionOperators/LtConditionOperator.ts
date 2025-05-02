import { FunnelConditionOperatorModel, FunnelConditionOperatorModelDto } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

interface LtConditionOperatorExtraParams {
    threshold?: number;
}

export class LtConditionOperator extends FunnelConditionOperatorModel<LtConditionOperatorExtraParams, FunnelFieldValueModel<number>> {
    constructor(dto: FunnelConditionOperatorModelDto<LtConditionOperatorExtraParams>) {
        super({
            id: "lt",
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

        return value.exists() && value.value < this.params.extra.threshold;
    }
}