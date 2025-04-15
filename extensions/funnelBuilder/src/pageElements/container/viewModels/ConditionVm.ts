import { makeAutoObservable } from "mobx";
import { ComparisonOperator, Condition } from "../models/Condition";

export class ConditionVm {
    condition: Condition;

    constructor(condition?: Condition) {
        this.condition = condition ?? new Condition();
        makeAutoObservable(this);
    }

    setField(field: string) {
        this.condition.field = field;
    }

    setOperator(operator: ComparisonOperator) {
        this.condition.operator = operator;
    }

    setValue(value: string) {
        this.condition.value = value;
    }
}

