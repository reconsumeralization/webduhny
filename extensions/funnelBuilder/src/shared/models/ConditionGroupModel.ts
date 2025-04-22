import { ConditionModel } from "./ConditionModel";

export type ConditionGroupItem = ConditionModel | ConditionGroupModel;

interface ConditionGroupModelDto {
    operator: "AND" | "OR";
    items: ConditionGroupItem[];
}

export class ConditionGroupModel {
    operator: "AND" | "OR";
    items: ConditionGroupItem[] = [];

    constructor(init?: Partial<ConditionGroupModel>) {
        this.operator = init?.operator ?? "AND";
        this.items = init?.items ?? [];
    }

    toDto(): ConditionGroupModelDto {
        return {
            operator: this.operator,
            items: this.items.map(item =>
                item instanceof ConditionGroupModel ? item.toDto() : item.toDto()
            )
        };
    }

    static fromDto(dto: ConditionGroupModelDto): ConditionGroupModel {
        const group = new ConditionGroupModel({ operator: dto.operator });
        group.items = dto.items.map((item: any) => {
            if (item.items) {
                return ConditionGroupModel.fromDto(item);
            } else {
                return ConditionModel.fromJSON(item);
            }
        });
        return group;
    }
}
