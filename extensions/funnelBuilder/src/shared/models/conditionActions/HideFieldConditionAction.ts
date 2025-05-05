import {
    FunnelConditionActionModel,
    FunnelConditionActionModelDto
} from "../FunnelConditionActionModel";

interface HideFieldConditionActionExtraParams {
    targetFieldId?: number;
}

export class HideFieldConditionAction extends FunnelConditionActionModel<HideFieldConditionActionExtraParams> {
    static override type = "hideField";
    static override optionLabel = "Hide field";

    constructor(dto: FunnelConditionActionModelDto<HideFieldConditionActionExtraParams>) {
        super({
            type: "hideField",
            params: {
                extra: {
                    targetFieldId: dto.params?.extra?.targetFieldId
                }
            }
        });
    }
}
