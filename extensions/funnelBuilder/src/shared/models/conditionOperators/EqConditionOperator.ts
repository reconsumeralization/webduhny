import {
    FunnelConditionOperatorModel,
    FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<string | number>;

interface EqConditionOperatorExtraParams {
    value?: string | number | boolean;
}

export class EqConditionOperator extends FunnelConditionOperatorModel<
    FieldValue,
    FunnelFieldValueModel
> {
    static override supportedFieldValues = ["string", "number", "boolean"];
    static override id = "eq";

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

    override evaluate(value: FieldValue): boolean {
        return value.hasValue() && value.value === this.params.extra.value;
    }
}
