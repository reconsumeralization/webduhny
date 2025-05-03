import {
    FunnelConditionOperatorModel,
    FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<number>;

interface LtConditionOperatorExtraParams {
    threshold?: number;
}

export class LtConditionOperator extends FunnelConditionOperatorModel<
    FieldValue,
    LtConditionOperatorExtraParams
> {
    static override supportedFieldValues = ["number"];
    static override id = "lt";

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
            return false;
        }

        return value.exists() && value.value < this.params.extra.threshold;
    }
}
