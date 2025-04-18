import { ConditionModel } from "./ConditionModel";

export type ConditionGroupItem = ConditionModel | ConditionGroupModel;

export class ConditionGroupModel {
    operator: "AND" | "OR";
    items: ConditionGroupItem[] = [];

    constructor(init?: Partial<ConditionGroupModel>) {
        this.operator = init?.operator ?? "AND";
        this.items = init?.items ?? [];
    }

    toJSON(): any {
        return {
            operator: this.operator,
            items: this.items.map(item =>
                item instanceof ConditionGroupModel ? item.toJSON() : item.toJSON()
            ),
        };
    }

    static fromJSON(json: any): ConditionGroupModel {
        const group = new ConditionGroupModel({ operator: json.operator });
        group.items = json.items.map((item: any) => {
            if (item.items) {
                return ConditionGroupModel.fromJSON(item);
            } else {
                return ConditionModel.fromJSON(item);
            }
        });
        return group;
    }
}
