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
    override supportedFieldValues = ["string", "number"];

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
        if (!this.params.extra.value) {
            return true;
        }

        if (!value.exists()) {
            return false;
        }

        if (value.array) {
            return !Array.isArray(value.value) || !value.value.includes(this.params.extra.value);
        }

        return !String(value.value).includes(this.params.extra.value);
    }
}
