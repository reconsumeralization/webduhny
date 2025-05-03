import { FunnelConditionOperatorModel, FunnelConditionOperatorModelDto } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

interface NeqConditionOperatorExtraParams {
    value?: any;
}

export class NeqConditionOperator extends FunnelConditionOperatorModel<NeqConditionOperatorExtraParams, FunnelFieldValueModel<string | number>> {
    constructor(dto: FunnelConditionOperatorModelDto<NeqConditionOperatorExtraParams>) {
        super({
            id: "neq",
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

        return value.exists() && value.value !== this.params.extra.value;
    }
}