import {
    FunnelConditionOperatorModel,
    FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<string | number | boolean>;

interface IncludesConditionOperatorExtraParams {
    value?: string | number | boolean;
}

export class IncludesConditionOperator extends FunnelConditionOperatorModel<
    FieldValue,
    IncludesConditionOperatorExtraParams
> {
    override supportedFieldValues = ["string", "stringArray", "number", "numberArray", "booleanArray"];

    constructor(dto: FunnelConditionOperatorModelDto<IncludesConditionOperatorExtraParams>) {
        super({
            id: "includes",
            params: {
                extra: {
                    value: dto.params?.extra?.value
                }
            }
        });
    }

    override evaluate(value: FieldValue): boolean {
        if (!value.exists()) {
            return false;
        }

        if (!this.params.extra.value) {
            return false;
        }

        if (value.array) {
            return Array.isArray(value.value) && value.value.includes(this.params.extra.value);
        }

        return String(value.value).includes(String(this.params.extra.value));
    }
}
