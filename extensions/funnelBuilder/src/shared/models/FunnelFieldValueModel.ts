import { createObjectHash } from "../createObjectHash";

export interface FunnelFieldValueModelDto<TValue = unknown> {
    type: string;
    value: TValue;
}

export class FunnelFieldValueModel<TValue = unknown> {
    type: string;
    value: TValue

    constructor(dto: FunnelFieldValueModelDto<TValue>) {
        this.type = dto.type;
        this.value = dto.value;
    }

    toDto(): FunnelFieldValueModelDto<TValue> {
        return {
            type: this.type,
            value: this.value
        };
    }

    populate(dto: Partial<FunnelFieldValueModelDto<TValue>>) {
        this.type = dto.type || this.type;
        this.value = dto.value || this.value;
    }

    getChecksum(): string {
        return createObjectHash(this.toDto());
    }

    clone() {
        return FunnelFieldValueModel.fromDto(this.toDto());
    }

    static fromDto<TValue = unknown>(dto: FunnelFieldValueModelDto<TValue>): FunnelFieldValueModel<TValue> {
        // Could not import the module directly because of circular dependency.
        return require("./fields/fieldFactory").fieldFromDto(dto);
    }
}
