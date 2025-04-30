import React from "react";
import { Bind, BindComponentRenderPropOnChange, Form, FormOnSubmit, useBind } from "@webiny/form";
import { ButtonDefault, ButtonPrimary as Button, IconButton } from "@webiny/ui/Button";
import { Select } from "@webiny/ui/Select";
import { DynamicFieldset } from "@webiny/ui/DynamicFieldset";
import { Accordion, AccordionItem } from "@webiny/ui/Accordion";
import { Typography } from "@webiny/ui/Typography";
import { Input } from "@webiny/ui/Input";
import styled from "@emotion/styled";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as BasePlusIcon } from "@material-design-icons/svg/outlined/add.svg";
import { FunnelConditionRuleModelDto } from "../../../../../../shared/models/FunnelConditionRuleModel";
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from "@webiny/ui/Dialog";
import { ClassNames } from "@emotion/react";
import { getRandomId } from "../../../../../../shared/getRandomId";

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

interface ConditionRulesFormData {
    rules: FunnelConditionRuleModelDto[];
}

export const ConditionRules = () => {
    const bind = useBind({
        name: "rules"
    });

    const rules = bind.value as ConditionRulesFormData["rules"];
    const updateRules = bind.onChange as BindComponentRenderPropOnChange<
        ConditionRulesFormData["rules"]
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

    return (
        <>
            <div>
                <Button onClick={addRule}>
                    <PlusIcon /> Add Rule
                </Button>
            </div>
            {/*<Accordion elevation={1}>
                {rules.map((rule, ruleIndex) => (
                    <AccordionItem key={rule.id} title={`Rule ${ruleIndex + 1}`}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    columnGap: 10
                                }}
                            >
                                 <div>If</div>
                                {rule.conditions.map((condition, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10
                                        }}
                                    >
                                        {index > 0 && <span>AND</span>}
                                        <Chip onRemove={() => {}}>
                                            {condition.elementId} {condition.operator}{" "}
                                            {condition.value}
                                        </Chip>
                                    </div>
                                ))}
                                <ArrowRight />
                                <Chip onRemove={() => {}}>{rule.action.type}</Chip>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 20
                                }}
                            >
                                <h4>Conditions</h4>

                                <Accordion elevation={1}>
                                    <AccordionItem
                                        key={index}
                                        title={`Condition ${index + 1}`}
                                    >

                                    </AccordionItem>
                                </Accordion>

                                <Bind name={`rules.${ruleIndex}`}>
                                    <DynamicFieldset>
                                        {({ actions, header, row, empty }) => (
                                            <>
                                                {row(({ data: rule, index: conditionIndex }) => (
                                                    <Fieldset>
                                                        {rule.conditionGroup.items.map(() => {
                                                            return (
                                                                <>
                                                                    <Bind
                                                                        name={`rules.${ruleIndex}.conditionGroup.items.`}
                                                                    >
                                                                        <Select size={"small"}>
                                                                            <option value="ele1">
                                                                                EL1
                                                                            </option>
                                                                            <option value="ele2">
                                                                                EL2
                                                                            </option>
                                                                        </Select>
                                                                    </Bind>

                                                                    <Bind
                                                                        name={`rules.${ruleIndex}.conditions.${conditionIndex}.operator`}
                                                                    >
                                                                        <Select size={"small"}>
                                                                            <option value="equals">
                                                                                equals
                                                                            </option>
                                                                            <option value="notEquals">
                                                                                not equals
                                                                            </option>
                                                                            <option value="contains">
                                                                                contains
                                                                            </option>
                                                                            <option value="greaterThan">
                                                                                greater than
                                                                            </option>
                                                                            <option value="lessThan">
                                                                                less than
                                                                            </option>
                                                                        </Select>
                                                                    </Bind>

                                                                    <Bind
                                                                        name={`rules.${ruleIndex}.conditions.${conditionIndex}.value`}
                                                                    >
                                                                        <Input size={"small"} />
                                                                    </Bind>

                                                                    <DeleteConditionButton
                                                                        icon={<DeleteIcon />}
                                                                        onClick={() => {
                                                                            actions.remove(
                                                                                conditionIndex
                                                                            );
                                                                        }}
                                                                    />
                                                                </>
                                                            );
                                                        })}
                                                    </Fieldset>
                                                ))}
                                                {empty(() => (
                                                    <Header>
                                                        <Typography use={"overline"}>
                                                            Conditions
                                                        </Typography>
                                                        <ButtonDefault
                                                            // @ts-ignore
                                                            onClick={actions.add}
                                                        >
                                                            <PlusIcon /> Add Condition
                                                        </ButtonDefault>
                                                    </Header>
                                                ))}
                                                {header(() => (
                                                    <Header>
                                                        <Typography use={"overline"}>
                                                            Conditions
                                                        </Typography>
                                                        <ButtonDefault
                                                            // @ts-ignore
                                                            onClick={actions.add}
                                                        >
                                                            <PlusIcon /> Add Condition
                                                        </ButtonDefault>
                                                    </Header>
                                                ))}
                                            </>
                                        )}
                                    </DynamicFieldset>
                                </Bind>
                            </div>

                            <div>
                                <h4>Action</h4>
                                <Bind name={"ds"}>
                                    <Select
                                        onChange={value =>
                                            updateRuleAction(rule.id, { type: value })
                                        }
                                    >
                                        <option value="goto">Go to</option>
                                        <option value="show">Show</option>
                                        <option value="hide">Hide</option>
                                        <option value="enable">Enable</option>
                                        <option value="disable">Disable</option>
                                    </Select>
                                </Bind>
                                {rule.action.type === "goto" && (
                                    <Select
                                        value={rule.action.pageId}
                                        onChange={value =>
                                            updateRuleAction(rule.id, { pageId: value })
                                        }
                                    >
                                        <option value={"page1"}>Page 1</option>
                                        <option value={"page2"}>Page 2</option>
                                    </Select>
                                )}
                                {(rule.action.type === "disable" ||
                                    rule.action.type === "enable" ||
                                    rule.action.type === "show" ||
                                    rule.action.type === "hide") && (
                                    <Select
                                        value={rule.action.elementId}
                                        onChange={value =>
                                            updateRuleAction(rule.id, {
                                                elementId: value
                                            })
                                        }
                                    >
                                        <option value={"ele1"}>Element 1</option>
                                        <option value={"ele2"}>Element 2</option>
                                    </Select>
                                )}
                            </div>
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>*/}
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
    conditionRules: FunnelConditionRuleModelDto[];
    onClose: () => void;
    onSubmit: FormOnSubmit<ConditionRulesFormData>;
}

export const ConditionRulesDialog = ({
    conditionRules,
    open,
    onClose,
    onSubmit
}: ConditionRulesDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Conditional Rules</DialogTitle>
            {conditionRules && (
                <Form<ConditionRulesFormData> data={{ rules: conditionRules }} onSubmit={onSubmit}>
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
