import { FunnelConditionOperatorModel } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

export class NotEmptyConditionOperator extends FunnelConditionOperatorModel {
    static override supportedFieldValues = ["*"];
    static override id = "notEmpty";

    constructor() {
        super({
            id: "notEmpty",
            params: {
                extra: {}
            }
        });
    }

    override evaluate(value: FunnelFieldValueModel): boolean {
        return value.hasValue();
    }
}
