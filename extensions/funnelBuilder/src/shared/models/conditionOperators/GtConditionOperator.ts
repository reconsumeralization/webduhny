import {
    FunnelConditionOperatorModel,
    FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<number>;

interface GtConditionOperatorExtraParams {
    threshold?: number;
}

export class GtConditionOperator extends FunnelConditionOperatorModel<FieldValue, GtConditionOperatorExtraParams> {
    override supportedFieldValues = ["number"];

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

    override evaluate(value: FieldValue): boolean {
        if (!this.params.extra.threshold) {
            return true;
        }

        return value.exists() && value.value > this.params.extra.threshold;
    }
}
