import React, { useMemo } from "react";
import { ButtonDefault, ButtonIcon, IconButton } from "@webiny/ui/Button";
import { Select } from "@webiny/ui/Select";
import { Typography } from "@webiny/ui/Typography";
import styled from "@emotion/styled";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as BasePlusIcon } from "@material-design-icons/svg/outlined/add.svg";
import { FunnelConditionGroupModelDto } from "../../../../../../../../../shared/models/FunnelConditionGroupModel";
import { useConditionRulesForm } from "../../useConditionRulesForm";
import { Tooltip } from "@webiny/ui/Tooltip";
import { getConditionOperatorsByValueType } from "../../../../../../../../../shared/models/conditionOperators/conditionOperatorFactory";
import { plugins } from "@webiny/plugins";
import {
    PbEditorFunnelConditionOperatorPluginProps,
    ConditionOperatorParamsComponent
} from "../../../../../../../../admin/plugins/PbEditorFunnelConditionOperatorPlugin";
import { Form } from "@webiny/form";
import {
    ConditionOperatorParams,
    FunnelConditionOperatorModelDto
} from "../../../../../../../../../shared/models/FunnelConditionOperatorModel";

const Fieldset = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
    position: relative;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #ebeaeb;
    padding: 5px 0;
`;

const NoConditionsMessage = styled.div`
    padding: 10px;
`;

interface RuleConditionGroupProps {
    conditionGroup: FunnelConditionGroupModelDto;
    depth?: number;
}

export const RuleConditionGroup = ({ conditionGroup, depth = 1 }: RuleConditionGroupProps) => {
    const {
        funnel,
        addCondition,
        removeCondition,
        updateCondition,
        updateConditionGroupOperator,
        addConditionGroup,
        removeConditionGroup
    } = useConditionRulesForm();

    const conditionOperatorPlugins = useMemo(() => {
        return plugins.byType(
            "pb-editor-funnel-condition-operator"
        ) as unknown as PbEditorFunnelConditionOperatorPluginProps[];
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 40 * (depth - 1)
            }}
        >
            <Header>
                <Typography use={"overline"}>Conditions</Typography>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        flex: 1,
                        justifyContent: "right"
                    }}
                >
                    <Typography use={"caption"}>Operator:</Typography>
                    <Select
                        rootProps={{ style: { width: 100 } }}
                        size={"small"}
                        value={conditionGroup.operator}
                        onChange={(value: FunnelConditionGroupModelDto["operator"]) =>
                            updateConditionGroupOperator(conditionGroup.id, value)
                        }
                        options={[
                            { value: "and", label: "AND" },
                            { value: "or", label: "OR" }
                        ]}
                    />
                    <ButtonDefault onClick={() => addCondition(conditionGroup.id)} small={true}>
                        <ButtonIcon icon={<BasePlusIcon />} /> Add condition
                    </ButtonDefault>

                    <ButtonDefault
                        onClick={() => addConditionGroup(conditionGroup.id)}
                        small={true}
                    >
                        <ButtonIcon icon={<BasePlusIcon />} /> Add group
                    </ButtonDefault>

                    {depth > 1 ? (
                        <IconButton
                            icon={<DeleteIcon />}
                            onClick={() => removeConditionGroup(conditionGroup.id)}
                        />
                    ) : (
                        <Tooltip content={"Cannot delete root condition group."}>
                            <IconButton
                                disabled={true}
                                icon={<DeleteIcon />}
                                onClick={() => removeConditionGroup(conditionGroup.id)}
                            />
                        </Tooltip>
                    )}
                </div>
            </Header>

            {conditionGroup.items.length === 0 ? (
                <NoConditionsMessage>
                    <Typography use={"body2"} style={{ textAlign: "center", padding: "10px" }}>
                        No conditions added yet.
                    </Typography>
                </NoConditionsMessage>
            ) : (
                conditionGroup.items.map((conditionGroupItem, conditionIndex) => {
                    const isConditionGroup = "items" in conditionGroupItem;
                    if (isConditionGroup) {
                        return (
                            <RuleConditionGroup
                                conditionGroup={conditionGroupItem}
                                key={conditionGroupItem.id}
                                depth={depth + 1}
                            />
                        );
                    }

                    const fieldDefinition = funnel.fields.find(
                        f => f.fieldId === conditionGroupItem.sourceFieldId
                    );

                    const availableConditionOperators = getConditionOperatorsByValueType(
                        fieldDefinition?.value?.type || ""
                    );

                    const conditionOperatorPlugin = conditionOperatorPlugins.find(
                        p => p.operatorClass.id === conditionGroupItem.operator.id
                    );

                    let ConditionRuleParamsComponent: ConditionOperatorParamsComponent | undefined;
                    if (conditionOperatorPlugin) {
                        ConditionRuleParamsComponent = conditionOperatorPlugin.settingsRenderer;
                    }

                    return (
                        <Fieldset key={conditionGroupItem.id}>
                            <Select
                                size={"small"}
                                value={conditionGroupItem.sourceFieldId}
                                placeholder={"Select field..."}
                                onChange={value => {
                                    return updateCondition(conditionGroup.id, {
                                        ...conditionGroupItem,
                                        sourceFieldId: value
                                    });
                                }}
                            >
                                {funnel.fields.map(field => (
                                    <option key={field.id} value={field.fieldId}>
                                        {field.label}
                                    </option>
                                ))}
                            </Select>

                            <Select
                                size={"small"}
                                value={conditionGroupItem.operator.id}
                                placeholder={"Select operator..."}
                                onChange={id => {
                                    return updateCondition(conditionGroup.id, {
                                        ...conditionGroupItem,
                                        operator: { id }
                                    });
                                }}
                            >
                                {availableConditionOperators.map(operator => (
                                    <option key={operator.id} value={operator.id}>
                                        {operator.optionLabel}
                                    </option>
                                ))}
                            </Select>

                            {ConditionRuleParamsComponent && (
                                <Form<ConditionOperatorParams>
                                    data={conditionGroupItem.operator.params}
                                    onChange={params => {
                                        return updateCondition(conditionGroup.id, {
                                            ...conditionGroupItem,
                                            operator: {
                                                ...conditionGroupItem.operator,
                                                params
                                            }
                                        });
                                    }}
                                >
                                    {() => {
                                        return (
                                            <>
                                                {ConditionRuleParamsComponent ? (
                                                    <ConditionRuleParamsComponent field={fieldDefinition} />
                                                ) : null}
                                            </>
                                        );
                                    }}
                                </Form>
                            )}

                            <IconButton
                                icon={<DeleteIcon />}
                                onClick={() =>
                                    removeCondition(conditionGroup.id, conditionGroupItem.id)
                                }
                            />
                        </Fieldset>
                    );
                })
            )}
        </div>
    );
};
