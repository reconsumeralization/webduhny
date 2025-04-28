import { getRandomId } from "../getRandomId";
import {createObjectHash} from "../createObjectHash";

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

    getChecksum():string {
        return createObjectHash(this.toDto());
    }

    populate(stepDto: Partial<FunnelStepModelDto>) {
        if (stepDto.id) {
            this.id = stepDto.id;
        }
        if (stepDto.title) {
            this.title = stepDto.title;
        }
    }

    static fromDto(dto: FunnelStepModelDto): FunnelStepModel {
        return new FunnelStepModel(dto);
    }
}
