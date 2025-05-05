import {
    FunnelConditionActionModel,
    FunnelConditionActionModelDto
} from "../FunnelConditionActionModel";

interface DisableFieldConditionActionExtraParams {
    targetFieldId?: number;
}

export class DisableFieldConditionAction extends FunnelConditionActionModel<DisableFieldConditionActionExtraParams> {
    static override type = "disableField";
    static override optionLabel = "Disable field";

    constructor(dto?: FunnelConditionActionModelDto<DisableFieldConditionActionExtraParams>) {
        super({
            type: "disableField",
            params: {
                extra: {
                    targetFieldId: dto?.params?.extra?.targetFieldId
                }
            }
        });
    }
}
