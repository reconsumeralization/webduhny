import { FunnelConditionOperatorModel } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

export class NotEmptyConditionOperator extends FunnelConditionOperatorModel {
    static override supportedFieldValueTypes = ["*"];
    static override id = "notEmpty";
    static override optionLabel = "not empty";

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
