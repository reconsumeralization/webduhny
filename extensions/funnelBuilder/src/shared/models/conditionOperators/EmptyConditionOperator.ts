import { FunnelConditionOperatorModel } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

export class EmptyConditionOperator extends FunnelConditionOperatorModel {
    override supportedFieldValues = ["*"];

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
