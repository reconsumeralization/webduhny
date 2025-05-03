import { FunnelConditionOperatorModel, FunnelConditionOperatorModelDto } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

interface EqConditionOperatorExtraParams {
    value?: string;
}

export class EqConditionOperator extends FunnelConditionOperatorModel<EqConditionOperatorExtraParams, FunnelFieldValueModel<string | number>> {
    constructor(dto: FunnelConditionOperatorModelDto<EqConditionOperatorExtraParams>) {
        super({
            id: "eq",
            params: {
                extra: {
                    value: dto.params?.extra?.value
                }
            }
        });
    }

    override evaluate(value: FunnelFieldValueModel): boolean {
        if (!this.params.extra.value) {
            return true;
        }

        return value.exists() && value.value === this.params.extra.value;
    }
}
