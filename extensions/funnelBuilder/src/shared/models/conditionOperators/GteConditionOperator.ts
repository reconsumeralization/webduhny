import {
    FunnelConditionOperatorModel,
    FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<number>;

interface GteConditionOperatorExtraParams {
    threshold?: number;
}

export class GteConditionOperator extends FunnelConditionOperatorModel<
    FieldValue,
    GteConditionOperatorExtraParams
> {
    override supportedFieldValues = ["number"];

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

    override evaluate(value: FieldValue): boolean {
        if (!this.params.extra.threshold) {
            return false;
        }

        return value.exists() && value.value >= this.params.extra.threshold;
    }
}
