import {
    FunnelConditionOperatorModel,
    FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<string | number>;

interface NeqConditionOperatorExtraParams {
    value?: string | number | boolean;
}

export class NeqConditionOperator extends FunnelConditionOperatorModel<
    FieldValue,
    NeqConditionOperatorExtraParams
> {
    override supportedFieldValues = ["string", "number", "boolean"];

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

    override evaluate(value: FieldValue): boolean {
        return value.exists() && value.value !== this.params.extra.value;
    }
}
