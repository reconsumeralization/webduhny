// @ts-nocheck
import { FunnelModel } from "./FunnelModel";
import { FunnelSubmissionModel } from "./FunnelSubmissionModel";
import { FunnelConditionModel } from "./FunnelConditionModel";
import { FunnelConditionGroupModel, ConditionGroupItem } from "./FunnelConditionGroupModel";
import { FunnelConditionActionModel } from "./FunnelConditionActionModel";

export class FunnelConditionRulesEvaluator {
    funnel: FunnelModel;
    funnelSubmission: FunnelSubmissionModel;

    constructor(funnel: FunnelModel, funnelSubmission: FunnelSubmissionModel) {
        this.funnel = funnel;
        this.funnelSubmission = funnelSubmission;
    }

    evaluate(): FunnelConditionActionModel[] {
        const actions: FunnelConditionActionModel[] = [];

        // Evaluate each condition rule
        for (const rule of this.funnel.conditionRules) {
            // If the condition group evaluates to true, add the rule's actions to the list
            if (this.evaluateConditionGroup(rule.conditionGroup)) {
                actions.push(...rule.actions);
            }
        }

        return actions;
    }

    private evaluateConditionGroup(group: FunnelConditionGroupModel): boolean {
        // If there are no items, return true (empty condition is always satisfied)
        if (group.items.length === 0) {
            return true;
        }

        // Evaluate each item in the group
        const results = group.items.map(item => this.evaluateConditionGroupItem(item));

        // Apply the logical operator
        if (group.operator === "and") {
            return results.every(result => result);
        } else {
            return results.some(result => result);
        }
    }

    private evaluateConditionGroupItem(item: ConditionGroupItem): boolean {
        // If the item is a condition group, evaluate it recursively
        if (item instanceof FunnelConditionGroupModel) {
            return this.evaluateConditionGroup(item);
        }
        // Otherwise, it's a condition, so evaluate it
        return this.evaluateCondition(item);
    }

    private evaluateCondition(condition: FunnelConditionModel): boolean {
        // Get the field from the submission
        const field = this.funnelSubmission.getField(condition.sourceFieldId);
        if (!field) {
            return false;
        }

        return condition.operator.evaluate(field.value)
    }
}
