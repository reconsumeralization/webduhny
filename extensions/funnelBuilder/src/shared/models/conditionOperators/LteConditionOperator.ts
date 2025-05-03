import { FunnelConditionOperatorModel, FunnelConditionOperatorModelDto } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<number>;

interface LteConditionOperatorExtraParams {
    threshold?: number;
}

export class LteConditionOperator extends FunnelConditionOperatorModel<FieldValue, LteConditionOperatorExtraParams> {
    override supportedFieldValues = ["number"];

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

    override evaluate(value: FieldValue): boolean {
        if (!this.params.extra.threshold) {
            return true;
        }

        return value.exists() && value.value <= this.params.extra.threshold;
    }
}