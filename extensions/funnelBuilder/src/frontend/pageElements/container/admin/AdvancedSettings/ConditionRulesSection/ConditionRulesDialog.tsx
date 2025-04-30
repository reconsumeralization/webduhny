// @ts-nocheck
import React from "react";
import {
    BindComponentRenderPropOnChange,
    Form,
    FormOnSubmit,
    useBind,
    useForm
} from "@webiny/form";
import { ButtonDefault, ButtonPrimary as Button, IconButton } from "@webiny/ui/Button";
import { Select } from "@webiny/ui/Select";
import { Accordion, AccordionItem } from "@webiny/ui/Accordion";
import { Typography } from "@webiny/ui/Typography";
import { Input } from "@webiny/ui/Input";
import styled from "@emotion/styled";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as BasePlusIcon } from "@material-design-icons/svg/outlined/add.svg";
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from "@webiny/ui/Dialog";
import { ClassNames } from "@emotion/react";
import { getRandomId } from "../../../../../../shared/getRandomId";
import { FunnelModelDto } from "../../../../../../shared/models/FunnelModel";
import { FunnelConditionGroupModelDto } from "../../../../../../shared/models/FunnelConditionGroupModel";

const PlusIcon = styled(BasePlusIcon)`
    fill: white;
    width: 16px;
    height: 16px;
    margin-right: 2px;
`;

const ArrowRight = () => {
    return <span>→</span>;
};

const Fieldset = styled.div({
    display: "flex",
    alignItems: "center",
    columnGap: 10,
    position: "relative",
    width: "100%",
    marginBottom: 15
});

const Header = styled.div({
    display: "flex",
    justifyContent: "space-between"
});

const DeleteConditionButton = styled(IconButton)``;

const ConditionMessage = styled.span`
    color: var(--mdc-theme-text-secondary-on-background);
    font-size: 12px;
`;

// --------------------------------------------------------------------------------

// Recursive component to render condition groups and their items
interface ConditionGroupRendererProps {
    ruleIndex: number;
    group: any; // Using any for simplicity, should be FunnelConditionGroupModelDto
    groupPath: string; // Path to the group in the rules array, e.g., "rules[0].conditionGroup"
    fields: any[]; // Array of fields from the funnel model
    updateRules: (rules: any[]) => void;
    rules: any[]; // Array of rules
}

const ConditionGroupRenderer: React.FC<ConditionGroupRendererProps> = ({
    ruleIndex,
    group,
    groupPath,
    fields,
    updateRules,
    rules
}) => {
    // Add a condition to the group
    const addCondition = () => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];

        // Navigate to the correct group using the groupPath
        let currentGroup = rule;
        const pathParts = groupPath.split(".");
        for (let i = 1; i < pathParts.length; i++) {
            const part = pathParts[i];
            if (part.includes("[")) {
                const [arrayName, indexStr] = part.split("[");
                const index = parseInt(indexStr.replace("]", ""));
                currentGroup = currentGroup[arrayName][index];
            } else {
                currentGroup = currentGroup[part];
            }
        }

        // Add the new condition
        currentGroup.items.push({
            id: getRandomId(),
            sourceFieldId: "",
            operator: "eq",
            value: ""
        });

        updateRules(updatedRules);
    };

    // Add a nested condition group to the group
    const addNestedGroup = () => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];

        // Navigate to the correct group using the groupPath
        let currentGroup = rule;
        const pathParts = groupPath.split(".");
        for (let i = 1; i < pathParts.length; i++) {
            const part = pathParts[i];
            if (part.includes("[")) {
                const [arrayName, indexStr] = part.split("[");
                const index = parseInt(indexStr.replace("]", ""));
                currentGroup = currentGroup[arrayName][index];
            } else {
                currentGroup = currentGroup[part];
            }
        }

        // Add the new nested group
        currentGroup.items.push({
            id: getRandomId(),
            operator: "and",
            items: []
        });

        updateRules(updatedRules);
    };

    // Remove an item from the group
    const removeItem = (itemIndex: number) => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];

        // Navigate to the correct group using the groupPath
        let currentGroup = rule;
        const pathParts = groupPath.split(".");
        for (let i = 1; i < pathParts.length; i++) {
            const part = pathParts[i];
            if (part.includes("[")) {
                const [arrayName, indexStr] = part.split("[");
                const index = parseInt(indexStr.replace("]", ""));
                currentGroup = currentGroup[arrayName][index];
            } else {
                currentGroup = currentGroup[part];
            }
        }

        // Remove the item
        currentGroup.items = currentGroup.items.filter((_, index) => index !== itemIndex);

        updateRules(updatedRules);
    };

    // Update the operator of the group
    const updateOperator = (operator: "and" | "or") => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];

        // Navigate to the correct group using the groupPath
        let currentGroup = rule;
        const pathParts = groupPath.split(".");
        for (let i = 1; i < pathParts.length; i++) {
            const part = pathParts[i];
            if (part.includes("[")) {
                const [arrayName, indexStr] = part.split("[");
                const index = parseInt(indexStr.replace("]", ""));
                currentGroup = currentGroup[arrayName][index];
            } else {
                currentGroup = currentGroup[part];
            }
        }

        // Update the operator
        currentGroup.operator = operator;

        updateRules(updatedRules);
    };

    // Update a condition in the group
    const updateCondition = (itemIndex: number, updates: Partial<any>) => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];

        // Navigate to the correct group using the groupPath
        let currentGroup = rule;
        const pathParts = groupPath.split(".");
        for (let i = 1; i < pathParts.length; i++) {
            const part = pathParts[i];
            if (part.includes("[")) {
                const [arrayName, indexStr] = part.split("[");
                const index = parseInt(indexStr.replace("]", ""));
                currentGroup = currentGroup[arrayName][index];
            } else {
                currentGroup = currentGroup[part];
            }
        }

        // Update the condition
        currentGroup.items[itemIndex] = {
            ...currentGroup.items[itemIndex],
            ...updates
        };

        updateRules(updatedRules);
    };

    return (
        <div style={{ border: "1px solid #eee", padding: "10px", marginBottom: "10px" }}>
            <Header>
                <Typography use={"overline"}>Condition Group</Typography>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Typography use={"caption"}>Operator:</Typography>
                    <Select
                        size={"small"}
                        value={group.operator}
                        onChange={value => updateOperator(value as "and" | "or")}
                    >
                        <option value="and">AND</option>
                        <option value="or">OR</option>
                    </Select>
                    <ButtonDefault onClick={addCondition}>
                        <PlusIcon /> Add Condition
                    </ButtonDefault>
                    <ButtonDefault onClick={addNestedGroup}>
                        <PlusIcon /> Add Group
                    </ButtonDefault>
                </div>
            </Header>

            {group.items.length === 0 ? (
                <Typography use={"caption"} style={{ textAlign: "center", padding: "10px" }}>
                    No conditions added yet. Click "Add Condition" or "Add Group" to add one.
                </Typography>
            ) : (
                group.items.map((item, itemIndex) => {
                    // Check if the item is a condition group
                    const isConditionGroup = "items" in item;

                    if (isConditionGroup) {
                        // Render a nested condition group
                        return (
                            <div key={item.id} style={{ marginLeft: "20px" }}>
                                <ConditionGroupRenderer
                                    ruleIndex={ruleIndex}
                                    group={item}
                                    groupPath={`${groupPath}.items[${itemIndex}]`}
                                    fields={fields}
                                    updateRules={updateRules}
                                    rules={rules}
                                />
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <ButtonDefault onClick={() => removeItem(itemIndex)}>
                                        <DeleteIcon /> Remove Group
                                    </ButtonDefault>
                                </div>
                            </div>
                        );
                    } else {
                        // Render a condition
                        return (
                            <Fieldset key={item.id}>
                                <Select
                                    size={"small"}
                                    value={item.sourceFieldId}
                                    onChange={value =>
                                        updateCondition(itemIndex, { sourceFieldId: value })
                                    }
                                >
                                    <option value="">Select Field</option>
                                    {fields.map(field => (
                                        <option key={field.id} value={field.fieldId}>
                                            {field.label}
                                        </option>
                                    ))}
                                </Select>

                                <Select
                                    size={"small"}
                                    value={item.operator}
                                    onChange={value =>
                                        updateCondition(itemIndex, { operator: value })
                                    }
                                >
                                    <option value="eq">equals</option>
                                    <option value="neq">not equals</option>
                                    <option value="gt">greater than</option>
                                    <option value="gte">greater than or equal</option>
                                    <option value="lt">less than</option>
                                    <option value="lte">less than or equal</option>
                                    <option value="includes">includes</option>
                                    <option value="notIncludes">not includes</option>
                                </Select>

                                <Input
                                    size={"small"}
                                    value={item.value}
                                    onChange={value => updateCondition(itemIndex, { value })}
                                />

                                <DeleteConditionButton
                                    icon={<DeleteIcon />}
                                    onClick={() => removeItem(itemIndex)}
                                />
                            </Fieldset>
                        );
                    }
                })
            )}
        </div>
    );
};

export const ConditionRules = () => {
    // Get the full funnel model data
    const { data: formData } = useForm<FunnelModelDto>();

    // Get the condition rules from the model
    const conditionRulesBind = useBind({
        name: "conditionRules"
    });

    const rules = (conditionRulesBind.value as FunnelModelDto["conditionRules"]) || [];
    const updateRules = conditionRulesBind.onChange as BindComponentRenderPropOnChange<
        FunnelModelDto["conditionRules"]
    >;

    const addRule = () => {
        updateRules([
            ...rules,
            {
                id: getRandomId(),
                conditionGroup: { id: getRandomId(), items: [], operator: "and" },
                actions: []
            }
        ]);
    };

    const removeRule = (ruleId: string) => {
        updateRules(rules.filter(rule => rule.id !== ruleId));
    };

    const addCondition = (ruleIndex: number) => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];

        updatedRules[ruleIndex] = {
            ...rule,
            conditionGroup: {
                ...rule.conditionGroup,
                items: [
                    ...rule.conditionGroup.items,
                    {
                        id: getRandomId(),
                        sourceFieldId: "",
                        operator: "eq",
                        value: ""
                    }
                ]
            }
        };

        updateRules(updatedRules);
    };

    const removeCondition = (ruleIndex: number, conditionIndex: number) => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];

        updatedRules[ruleIndex] = {
            ...rule,
            conditionGroup: {
                ...rule.conditionGroup,
                items: rule.conditionGroup.items.filter((_, index) => index !== conditionIndex)
            }
        };

        updateRules(updatedRules);
    };

    const updateCondition = (ruleIndex: number, conditionIndex: number, updates: Partial<any>) => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];
        const items = [...rule.conditionGroup.items];

        items[conditionIndex] = {
            ...items[conditionIndex],
            ...updates
        };

        updatedRules[ruleIndex] = {
            ...rule,
            conditionGroup: {
                ...rule.conditionGroup,
                items
            }
        };

        updateRules(updatedRules);
    };

    const addAction = (ruleIndex: number) => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];

        updatedRules[ruleIndex] = {
            ...rule,
            actions: [
                ...rule.actions,
                {
                    id: getRandomId(),
                    type: "disableField",
                    target: {
                        id: "",
                        type: "field"
                    },
                    params: {}
                }
            ]
        };

        updateRules(updatedRules);
    };

    const removeAction = (ruleIndex: number, actionIndex: number) => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];

        updatedRules[ruleIndex] = {
            ...rule,
            actions: rule.actions.filter((_, index) => index !== actionIndex)
        };

        updateRules(updatedRules);
    };

    const updateAction = (ruleIndex: number, actionIndex: number, updates: Partial<any>) => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];
        const actions = [...rule.actions];

        actions[actionIndex] = {
            ...actions[actionIndex],
            ...updates
        };

        updatedRules[ruleIndex] = {
            ...rule,
            actions
        };

        updateRules(updatedRules);
    };

    const updateConditionGroupOperator = (ruleIndex: number, operator: "and" | "or") => {
        const updatedRules = [...rules];
        const rule = updatedRules[ruleIndex];

        updatedRules[ruleIndex] = {
            ...rule,
            conditionGroup: {
                ...rule.conditionGroup,
                operator
            }
        };

        updateRules(updatedRules);
    };

    // Get the fields from the funnel model
    const fields = formData.value?.fields || [];

    return (
        <>
            <div>
                <Button onClick={addRule}>
                    <PlusIcon /> Add Rule
                </Button>
            </div>
            <Accordion elevation={1}>
                {rules.map((rule, ruleIndex) => (
                    <AccordionItem key={rule.id} title={`Rule ${ruleIndex + 1}`}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20
                            }}
                        >
                            {/* Condition Group Section */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10
                                }}
                            >
                                <Header>
                                    <Typography use={"overline"}>Conditions</Typography>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <Typography use={"caption"}>Operator:</Typography>
                                        <Select
                                            size={"small"}
                                            value={rule.conditionGroup.operator}
                                            onChange={(
                                                value: FunnelConditionGroupModelDto["operator"]
                                            ) => updateConditionGroupOperator(ruleIndex, value)}
                                        >
                                            <option value="and">AND</option>
                                            <option value="or">OR</option>
                                        </Select>
                                        <ButtonDefault onClick={() => addCondition(ruleIndex)}>
                                            <PlusIcon /> Add Condition
                                        </ButtonDefault>
                                        <ButtonDefault
                                            onClick={() => {
                                                const updatedRules = [...rules];
                                                const rule = updatedRules[ruleIndex];

                                                rule.conditionGroup.items.push({
                                                    id: getRandomId(),
                                                    operator: "and",
                                                    items: []
                                                });

                                                updateRules(updatedRules);
                                            }}
                                        >
                                            <PlusIcon /> Add Group
                                        </ButtonDefault>
                                    </div>
                                </Header>

                                {rule.conditionGroup.items.length === 0 ? (
                                    <Typography
                                        use={"caption"}
                                        style={{ textAlign: "center", padding: "10px" }}
                                    >
                                        No conditions added yet. Click "Add Condition" to add one.
                                    </Typography>
                                ) : (
                                    rule.conditionGroup.items.map((condition, conditionIndex) => {
                                        const isConditionGroup = "items" in condition;
                                        if (isConditionGroup) {
                                            // Condition group.
                                            return (
                                                <div
                                                    key={condition.id}
                                                    style={{ marginLeft: "20px" }}
                                                >
                                                    <ConditionGroupRenderer
                                                        ruleIndex={ruleIndex}
                                                        group={condition}
                                                        groupPath={`conditionGroup.items[${conditionIndex}]`}
                                                        fields={fields}
                                                        updateRules={updateRules}
                                                        rules={rules}
                                                    />
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "flex-end"
                                                        }}
                                                    >
                                                        <ButtonDefault
                                                            onClick={() =>
                                                                removeCondition(
                                                                    ruleIndex,
                                                                    conditionIndex
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon /> Remove Group
                                                        </ButtonDefault>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        // Condition.
                                        return (
                                            <>
                                                <Fieldset key={conditionIndex}>
                                                    <Select
                                                        size={"small"}
                                                        value={condition.sourceFieldId}
                                                        onChange={value =>
                                                            updateCondition(
                                                                ruleIndex,
                                                                conditionIndex,
                                                                { sourceFieldId: value }
                                                            )
                                                        }
                                                    >
                                                        <option value="">Select Field</option>
                                                        <>
                                                            {fields.map(field => (
                                                                <option
                                                                    key={field.id}
                                                                    value={field.fieldId}
                                                                >
                                                                    {field.label}
                                                                </option>
                                                            ))}
                                                        </>
                                                    </Select>

                                                    <Select
                                                        size={"small"}
                                                        value={condition.operator}
                                                        onChange={value =>
                                                            updateCondition(
                                                                ruleIndex,
                                                                conditionIndex,
                                                                { operator: value }
                                                            )
                                                        }
                                                    >
                                                        <option value="eq">equals</option>
                                                        <option value="neq">not equals</option>
                                                        <option value="gt">greater than</option>
                                                        <option value="gte">
                                                            greater than or equal
                                                        </option>
                                                        <option value="lt">less than</option>
                                                        <option value="lte">
                                                            less than or equal
                                                        </option>
                                                        <option value="includes">includes</option>
                                                        <option value="notIncludes">
                                                            not includes
                                                        </option>
                                                    </Select>

                                                    <Input
                                                        size={"small"}
                                                        value={condition.value}
                                                        onChange={value =>
                                                            updateCondition(
                                                                ruleIndex,
                                                                conditionIndex,
                                                                { value }
                                                            )
                                                        }
                                                    />

                                                    <DeleteConditionButton
                                                        icon={<DeleteIcon />}
                                                        onClick={() =>
                                                            removeCondition(
                                                                ruleIndex,
                                                                conditionIndex
                                                            )
                                                        }
                                                    />
                                                </Fieldset>
                                            </>
                                        );
                                    })
                                )}
                            </div>

                            {/* Actions Section */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10
                                }}
                            >
                                <Header>
                                    <Typography use={"overline"}>Actions</Typography>
                                    <ButtonDefault onClick={() => addAction(ruleIndex)}>
                                        <PlusIcon /> Add Action
                                    </ButtonDefault>
                                </Header>

                                {rule.actions.length === 0 ? (
                                    <Typography
                                        use={"caption"}
                                        style={{ textAlign: "center", padding: "10px" }}
                                    >
                                        No actions added yet. Click "Add Action" to add one.
                                    </Typography>
                                ) : (
                                    rule.actions.map((action, actionIndex) => (
                                        <Fieldset key={actionIndex}>
                                            <Select
                                                size={"small"}
                                                value={action.type}
                                                onChange={value =>
                                                    updateAction(ruleIndex, actionIndex, {
                                                        type: value
                                                    })
                                                }
                                            >
                                                <option value="disableField">Disable Field</option>
                                                <option value="enableField">Enable Field</option>
                                                <option value="goToStep">Go To Step</option>
                                                <option value="showField">Show Field</option>
                                                <option value="hideField">Hide Field</option>
                                                <option value="submitAndEnd">Submit and End</option>
                                            </Select>

                                            {action.type !== "submitAndEnd" && (
                                                <Select
                                                    size={"small"}
                                                    value={action.target.id}
                                                    onChange={value =>
                                                        updateAction(ruleIndex, actionIndex, {
                                                            target: {
                                                                ...action.target,
                                                                id: value
                                                            }
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Target</option>
                                                    <>
                                                        {fields.map(field => (
                                                            <option
                                                                key={field.id}
                                                                value={field.fieldId}
                                                            >
                                                                {field.label}
                                                            </option>
                                                        ))}
                                                    </>
                                                </Select>
                                            )}

                                            <DeleteConditionButton
                                                icon={<DeleteIcon />}
                                                onClick={() => removeAction(ruleIndex, actionIndex)}
                                            />
                                        </Fieldset>
                                    ))
                                )}
                            </div>

                            {/* Delete Rule Button */}
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <ButtonDefault onClick={() => removeRule(rule.id)}>
                                    <DeleteIcon /> Delete Rule
                                </ButtonDefault>
                            </div>
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>

            {rules.length === 0 && (
                <Typography use={"caption"} style={{ textAlign: "center", padding: "20px" }}>
                    No rules added yet. Click "Add Rule" to add one.
                </Typography>
            )}
        </>
    );
};

const dialogContentCss = {
    width: 875,
    minHeight: 400,
    maxHeight: 600
};

interface ConditionRulesDialogProps {
    open: boolean;
    data: FunnelModelDto;
    onClose: () => void;
    onSubmit: FormOnSubmit<FunnelModelDto>;
}

export const ConditionRulesDialog = ({
    data,
    open,
    onClose,
    onSubmit
}: ConditionRulesDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Conditional Rules</DialogTitle>
            {data && (
                <Form<FunnelModelDto> data={data} onSubmit={onSubmit}>
                    {({ submit }) => (
                        <>
                            <ClassNames>
                                {({ css }) => (
                                    <DialogContent className={css(dialogContentCss)}>
                                        <ConditionRules />
                                    </DialogContent>
                                )}
                            </ClassNames>
                            <DialogActions style={{ justifyContent: "flex-end" }}>
                                <div>
                                    <DialogButton onClick={onClose}>{"Cancel"}</DialogButton>
                                    <DialogButton onClick={submit}>{"Save"}</DialogButton>
                                </div>
                            </DialogActions>
                        </>
                    )}
                </Form>
            )}
        </Dialog>
    );
};
