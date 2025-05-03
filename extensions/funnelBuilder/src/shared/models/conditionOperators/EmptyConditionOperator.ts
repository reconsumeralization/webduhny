import { FunnelConditionOperatorModel } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

export class EmptyConditionOperator extends FunnelConditionOperatorModel {
    static override supportedFieldValues = ["*"];
    static override id = "empty";

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
