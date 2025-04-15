export type LogicalOperator = "AND" | "OR";
export type ComparisonOperator = "equals" | "not_equals" | "contains" | "starts_with"; // extend as needed

export class Condition {
    field: string = "";
    operator: ComparisonOperator = "equals";
    value: string = "";

    constructor(init?: Partial<Condition>) {
        Object.assign(this, init);
    }
}

export class ConditionGroup {
    operator: LogicalOperator = "AND";
    items: Array<Condition | ConditionGroup> = [];

    constructor(init?: Partial<ConditionGroup>) {
        Object.assign(this, init);
    }
}