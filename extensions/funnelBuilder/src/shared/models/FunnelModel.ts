import { FunnelStepModel, FunnelStepModelDto } from "./FunnelStepModel";
// import {ConditionGroupModel} from "./ConditionGroupModel";
import { FunnelFieldDefinitionModel, FunnelFieldModelDto } from "./FunnelFieldDefinitionModel";

export interface FunnelModelDto {
    steps: FunnelStepModelDto[];
    fields: FunnelFieldModelDto[];
}

export class FunnelModel {
    fields: FunnelFieldDefinitionModel[] = [];
    steps: FunnelStepModel[] = [];

    // conditions?: FunnelConditionGroupModel; TODO

    constructor(funnelDto?: FunnelModelDto) {
        this.fields = funnelDto?.fields?.map(f => new FunnelFieldDefinitionModel(f)) ?? [];
        this.steps = funnelDto?.steps?.map(s => new FunnelStepModel(s)) ?? [];
        // this.conditions = init?.conditions
        //     ? new ConditionGroupModel(init.conditions)
        //     : undefined;
    }

    toDto(): FunnelModelDto {
        return {
            steps: this.steps.map(s => s.toDto()),
            // conditions: this.conditions?.toJSON(),
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
