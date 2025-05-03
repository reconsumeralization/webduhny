import { FunnelConditionOperatorModel, FunnelConditionOperatorModelDto } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<number>;

interface LtConditionOperatorExtraParams {
    threshold?: number;
}

export class LtConditionOperator extends FunnelConditionOperatorModel<FieldValue, LtConditionOperatorExtraParams> {
    override supportedFieldValues = ["number"];

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

    override evaluate(value: FieldValue): boolean {
        if (!this.params.extra.threshold) {
            return true;
        }

        return value.exists() && value.value < this.params.extra.threshold;
    }
}