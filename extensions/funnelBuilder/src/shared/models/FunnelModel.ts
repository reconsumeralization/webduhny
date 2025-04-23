import { FunnelStepModel, FunnelStepModelDto } from "./FunnelStepModel";
import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "./FunnelFieldDefinitionModel";

export interface FunnelModelDto {
    steps: FunnelStepModelDto[];
    fields: FunnelFieldDefinitionModelDto[];
}

export class FunnelModel {
    fields: FunnelFieldDefinitionModel[] = [];
    steps: FunnelStepModel[] = [];

    constructor(funnelDto?: FunnelModelDto) {
        this.fields = funnelDto?.fields?.map(f => FunnelFieldDefinitionModel.fromDto(f)) || [];
        this.steps = funnelDto?.steps?.map(s => FunnelStepModel.fromDto(s)) || [
            new FunnelStepModel()
        ];
    }

    toDto(): FunnelModelDto {
        return {
            steps: this.steps.map(s => s.toDto()),
            fields: this.fields.map(f => f.toDto())
        };
    }

    static fromDto(dto: FunnelModelDto): FunnelModel {
        return new FunnelModel({
            fields: dto.fields?.map(s => FunnelFieldDefinitionModel.fromDto(s)),
            steps: dto.steps?.map(s => FunnelStepModel.fromDto(s))
        });
    }
}
