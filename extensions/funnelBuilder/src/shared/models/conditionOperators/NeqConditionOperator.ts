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
    static override supportedFieldValues = ["string", "number", "boolean"];
    static override id = "neq";

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
