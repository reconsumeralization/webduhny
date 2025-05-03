import {
    FunnelConditionOperatorModel,
    FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

type FieldValue = FunnelFieldValueModel<string | number>;

interface NotIncludesConditionOperatorExtraParams {
    value?: string;
}

export class NotIncludesConditionOperator extends FunnelConditionOperatorModel<
    FieldValue,
    NotIncludesConditionOperatorExtraParams
> {
    static override supportedFieldValues = ["string", "stringArray", "number", "numberArray"];
    static override id = "notIncludes";

    constructor(dto: FunnelConditionOperatorModelDto<NotIncludesConditionOperatorExtraParams>) {
        super({
            id: "notIncludes",
            params: {
                extra: {
                    value: dto.params?.extra?.value
                }
            }
        });
    }

    override evaluate(value: FieldValue): boolean {
        if (!value.exists()) {
            return true;
        }

        if (!this.params.extra.value) {
            return false;
        }

        if (value.array) {
            return !Array.isArray(value.value) || !value.value.includes(this.params.extra.value);
        }

        return !String(value.value).includes(String(this.params.extra.value));
    }
}
