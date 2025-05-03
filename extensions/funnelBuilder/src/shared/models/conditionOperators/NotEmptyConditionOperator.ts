import { FunnelConditionOperatorModel } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

export class NotEmptyConditionOperator extends FunnelConditionOperatorModel {
    override supportedFieldValues = ["*"];

    constructor() {
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
