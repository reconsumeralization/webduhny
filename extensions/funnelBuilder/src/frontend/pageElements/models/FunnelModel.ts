import { FunnelStepModel, FunnelStepModelDto } from "./FunnelStepModel";
// import {ConditionGroupModel} from "./ConditionGroupModel";
import { FunnelFieldModel, FunnelFieldModelDto } from "./FunnelFieldModel";

export interface FunnelModelDto {
    steps: FunnelStepModelDto[];
    fields: FunnelFieldModelDto[];
}

export class FunnelModel {
    fields: FunnelFieldModel[] = [];
    steps: FunnelStepModel[] = [];

    // conditions?: FunnelConditionGroupModel; TODO

    constructor(init?: Partial<FunnelModel>) {
        this.fields = init?.fields?.map(f => new FunnelFieldModel(f)) ?? [];
        this.steps = init?.steps?.map(s => new FunnelStepModel(s)) ?? [];
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
            fields: dto.fields?.map(s => FunnelFieldModel.fromDto(s)),
            steps: dto.steps?.map(s => FunnelStepModel.fromDto(s))
        });
    }
}
