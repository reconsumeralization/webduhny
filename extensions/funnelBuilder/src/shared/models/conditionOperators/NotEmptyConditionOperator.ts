import { FunnelConditionOperatorModel, FunnelConditionOperatorModelDto } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

export class NotEmptyConditionOperator extends FunnelConditionOperatorModel<{}> {
    constructor(dto: FunnelConditionOperatorModelDto<{}>) {
        super({
            id: "notEmpty",
            params: {
                extra: {}
            }
        });
    }

    override evaluate(value: FunnelFieldValueModel): boolean {
        return value.exists();
    }
}