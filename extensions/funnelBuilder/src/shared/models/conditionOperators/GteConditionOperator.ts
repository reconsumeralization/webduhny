import { FunnelConditionOperatorModel, FunnelConditionOperatorModelDto } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

interface GteConditionOperatorExtraParams {
    threshold?: number;
}

export class GteConditionOperator extends FunnelConditionOperatorModel<GteConditionOperatorExtraParams> {
    constructor(dto: FunnelConditionOperatorModelDto<GteConditionOperatorExtraParams>) {
        super({
            id: "gte",
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

        return value.exists() && value.value >= this.params.extra.threshold;
    }
}
