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
    EqConditionOperatorExtraParams
> {
    static override supportedFieldValueTypes = ["string", "number", "boolean"];
    static override id = "eq";
    static override optionLabel = "equals";

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
