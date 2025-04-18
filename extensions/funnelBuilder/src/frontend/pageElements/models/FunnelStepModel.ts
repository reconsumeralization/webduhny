import { getRandomId } from "../../../shared/getRandomId";

export interface FunnelStepModelDto {
    id: string;
    name: string;
    action?: string;
    target?: string;
}

export class FunnelStepModel {
    id: string;
    name: string;
    action?: string;
    target?: string;

    constructor(init?: Partial<FunnelStepModel>) {
        this.id = init?.id ?? getRandomId();
        this.name = init?.name ?? "Step";
        this.action = init?.action ?? "go_to_page";
        this.target = init?.target ?? "";
    }

    toDto(): FunnelStepModelDto {
        return {
            id: this.id,
            name: this.name,
            action: this.action,
            target: this.target
        };
    }

    static fromDto(dto: FunnelStepModelDto): FunnelStepModel {
        return new FunnelStepModel(dto);
    }
}
