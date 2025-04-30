import { getRandomId } from "../getRandomId";

export type FunnelConditionActionType =
    | "disableField"
    | "enableField"
    | "goToStep"
    | "showField"
    | "hideField"
    | "submitAndEnd";

export type FunnelConditionActionTarget = {
    id: string;
    type: "field"; // Only "field" target type is supported for now.
};

export interface FunnelConditionActionModelDto {
    id: string;
    type: FunnelConditionActionType;
    target: FunnelConditionActionTarget;
    params: Record<string, any>;
}

export class FunnelConditionActionModel {
    id: string;
    type: FunnelConditionActionType;
    target: FunnelConditionActionTarget;
    params: Record<string, any>;

    constructor(dto?: FunnelConditionActionModelDto) {
        this.id = dto?.id || getRandomId();
        this.type = dto?.type ?? "disableField";
        this.target = dto?.target ?? { id: "", type: "field" };
        this.params = dto?.params ?? {};
    }

    toDto(): FunnelConditionActionModelDto {
        return {
            id: this.id,
            type: this.type,
            target: this.target,
            params: this.params
        };
    }

    static fromDto(dto: FunnelConditionActionModelDto) {
        return new FunnelConditionActionModel(dto);
    }
}
