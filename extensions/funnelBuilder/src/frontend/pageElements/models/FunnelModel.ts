import { FunnelStepModel } from "./FunnelStepModel";
import { ConditionGroupModel } from "./ConditionGroupModel";
import { FunnelField } from "./FunnelFieldModel";

export class FunnelModel {
    steps: FunnelStepModel[] = [];
    conditions?: ConditionGroupModel;
    fields: FunnelField[] = [];

    constructor(init?: Partial<FunnelModel>) {
        this.steps = init?.steps?.map(s => new FunnelStepModel(s)) ?? [];
        this.conditions = init?.conditions
            ? new ConditionGroupModel(init.conditions)
            : undefined;
        this.fields = init?.fields?.map(f => new FunnelField(f)) ?? [];
    }

    toJSON() {
        return {
            steps: this.steps.map(s => s.toJSON()),
            conditions: this.conditions?.toJSON(),
            fields: this.fields.map(f => f.toJSON()),
        };
    }

    static fromJSON(json: any): FunnelModel {
        return new FunnelModel({
            steps: json.steps?.map((s: any) => FunnelStepModel.fromJSON(s)),
            conditions: json.conditions
                ? ConditionGroupModel.fromJSON(json.conditions)
                : undefined,
            fields: json.fields?.map((f: any) => FunnelField.fromJSON(f)),
        });
    }

    addField() {
        const newField = new FunnelField();
        this.fields.push(newField);
    }

    removeField(field: FunnelField) {
        this.fields = this.fields.filter(f => f !== field);
    }


}
