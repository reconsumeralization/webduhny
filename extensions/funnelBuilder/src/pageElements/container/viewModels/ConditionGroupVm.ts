import { makeAutoObservable } from "mobx";
import { Condition, ConditionGroup } from "../models/Condition";
import { ConditionVm } from "./ConditionVm";

export class ConditionGroupVm {
    group: ConditionGroup;
    items: Array<ConditionVm | ConditionGroupVm> = [];

    constructor(group?: ConditionGroup) {
        this.group = group ?? new ConditionGroup();
        this.items = this.group.items.map(item =>
            item instanceof ConditionGroup
                ? new ConditionGroupVm(item)
                : new ConditionVm(item as Condition)
        );
        makeAutoObservable(this);
    }

    get isAnd() {
        return this.group.operator === "AND";
    }

    get isOr() {
        return this.group.operator === "OR";
    }

    toggleOperator() {
        this.group.operator = this.isAnd ? "OR" : "AND";
    }

    addCondition() {
        const condition = new Condition();
        const vm = new ConditionVm(condition);
        this.items.push(vm);
        this.group.items.push(condition);
    }

    addGroup() {
        const group = new ConditionGroup();
        const vm = new ConditionGroupVm(group);
        this.items.push(vm);
        this.group.items.push(group);
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
        this.group.items.splice(index, 1);
    }

    moveItem(from: number, to: number) {
        const item = this.items.splice(from, 1)[0];
        const modelItem = this.group.items.splice(from, 1)[0];
        this.items.splice(to, 0, item);
        this.group.items.splice(to, 0, modelItem);
    }
}
