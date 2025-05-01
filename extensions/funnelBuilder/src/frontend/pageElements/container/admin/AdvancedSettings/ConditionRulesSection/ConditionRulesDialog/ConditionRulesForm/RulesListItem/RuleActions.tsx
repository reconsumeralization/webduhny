import React from "react";
import { ButtonDefault, ButtonIcon, IconButton } from "@webiny/ui/Button";
import { Select } from "@webiny/ui/Select";
import { Typography } from "@webiny/ui/Typography";
import styled from "@emotion/styled";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as PlusIcon } from "@material-design-icons/svg/outlined/add.svg";
import { useConditionRulesForm } from "../../useConditionRulesForm";
import { FunnelConditionRuleModelDto } from "../../../../../../../../../shared/models/FunnelConditionRuleModel";

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

export interface RuleActionsProps {
    rule: FunnelConditionRuleModelDto;
}

export const RuleActions = ({ rule }: RuleActionsProps) => {
    const { funnel, addAction, removeAction, updateAction } = useConditionRulesForm();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 10
            }}
        >
            <Header>
                <Typography use={"overline"}>Actions</Typography>
                <ButtonDefault onClick={() => addAction(rule.id)}>
                    <ButtonIcon icon={<PlusIcon />} /> Add action
                </ButtonDefault>
            </Header>

            {rule.actions.length === 0 ? (
                <Typography use={"body2"} style={{ textAlign: "center", padding: "10px" }}>
                    No actions added yet.
                </Typography>
            ) : (
                rule.actions.map((action, actionIndex) => (
                    <Fieldset key={actionIndex}>
                        <Select
                            size={"small"}
                            value={action.type}
                            onChange={value =>
                                updateAction(rule.id, {
                                    ...action,
                                    type: value
                                })
                            }
                        >
                            <option value="disableField">Disable Field</option>
                            <option value="enableField">Enable Field</option>
                            <option value="showField">Show Field</option>
                            <option value="hideField">Hide Field</option>
                            <option value="onSubmitActivateStep">Go to step</option>
                            <option value="onSubmitEnd">End funnel</option>
                        </Select>

                        {action.type !== "onSubmitActivateStep" &&
                            action.type !== "onSubmitEnd" && (
                                <Select
                                    placeholder={"Select target..."}
                                    size={"small"}
                                    value={action.target.id}
                                    onChange={fieldId =>
                                        updateAction(rule.id, {
                                            ...action,
                                            target: { type: "field", id: fieldId }
                                        })
                                    }
                                >
                                    {funnel.fields.map(field => (
                                        <option key={field.id} value={field.fieldId}>
                                            {field.label}
                                        </option>
                                    ))}
                                </Select>
                            )}

                        <IconButton
                            icon={<DeleteIcon />}
                            onClick={() => removeAction(rule.id, action.id)}
                        />
                    </Fieldset>
                ))
            )}
        </div>
    );
};
