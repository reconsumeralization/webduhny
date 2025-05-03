import {
    FunnelConditionOperatorModel,
    FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<number>;

interface LteConditionOperatorExtraParams {
    threshold?: number;
}

export class LteConditionOperator extends FunnelConditionOperatorModel<
    FieldValue,
    LteConditionOperatorExtraParams
> {
    static override supportedFieldValues = ["number"];
    static override id = "lte";

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
            return false;
        }

        return value.exists() && value.value <= this.params.extra.threshold;
    }
}
