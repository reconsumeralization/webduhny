import { getRandomId } from "../getRandomId";

export interface FunnelStepModelDto {
    id: string;
    title: string;
}

export class FunnelStepModel {
    id: string;
    title: string;

    constructor(init?: Partial<FunnelStepModel>) {
        this.id = init?.id ?? getRandomId();
        this.title = init?.title ?? "Step";
    }

    toDto(): FunnelStepModelDto {
        return {
            id: this.id,
            title: this.title
        };
    }

    static fromDto(dto: FunnelStepModelDto): FunnelStepModel {
        return new FunnelStepModel(dto);
    }
}
