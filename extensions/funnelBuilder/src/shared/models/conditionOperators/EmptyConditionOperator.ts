import { FunnelConditionOperatorModel } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

export class EmptyConditionOperator extends FunnelConditionOperatorModel {
    static override supportedFieldValueTypes = ["*"];
    static override id = "empty";
    static override optionLabel = "is empty";

    constructor() {
        super({
            id: "empty",
            params: {
                extra: {}
            }
        });
    }

    override evaluate(value: FunnelFieldValueModel): boolean {
        return value.isEmpty();
    }
}
