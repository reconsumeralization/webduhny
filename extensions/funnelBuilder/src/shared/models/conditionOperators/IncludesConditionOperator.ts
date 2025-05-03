import {
    FunnelConditionOperatorModel,
    FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<string | number>;

interface IncludesConditionOperatorExtraParams {
    value?: string;
}

export class IncludesConditionOperator extends FunnelConditionOperatorModel<
    FieldValue,
    IncludesConditionOperatorExtraParams
> {
    override supportedFieldValues = ["string", "number"];

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
        if (!this.params.extra.value) {
            return true;
        }

        if (!value.exists()) {
            return false;
        }

        if (value.array) {
            return Array.isArray(value.value) && value.value.includes(this.params.extra.value);
        }

        return String(value.value).includes(this.params.extra.value);
    }
}
