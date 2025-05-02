import { FunnelConditionOperatorModel, FunnelConditionOperatorModelDto } from "../FunnelConditionOperatorModel";
import { FunnelFieldValueModel } from "../FunnelFieldValueModel";

export class EmptyConditionOperator extends FunnelConditionOperatorModel<{}> {
    constructor(dto: FunnelConditionOperatorModelDto<{}>) {
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