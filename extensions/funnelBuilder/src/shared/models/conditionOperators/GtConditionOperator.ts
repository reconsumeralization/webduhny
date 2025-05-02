import {
    FunnelConditionOperatorModel,
    FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

interface GtConditionOperatorExtraParams {
    threshold?: number;
}

export class GtConditionOperator extends FunnelConditionOperatorModel<GtConditionOperatorExtraParams, FunnelFieldValueModel<number>> {
    constructor(dto: FunnelConditionOperatorModelDto<GtConditionOperatorExtraParams>) {
        super({
            id: "gt",
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

        return value.exists() && value.value > this.params.extra.threshold;
    }
}
