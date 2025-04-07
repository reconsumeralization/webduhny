// @ts-nocheck woops
import React, { Fragment, useCallback, useState } from "react";
import { useDialogs, useSnackbar } from "@webiny/app-admin";
import { Form, GenericFormData } from "@webiny/form";
import { ButtonDefault, ButtonPrimary as Button, IconButton } from "@webiny/ui/Button";
import { Select } from "@webiny/ui/Select";
import { DynamicFieldset } from "@webiny/ui/DynamicFieldset";
import { Chip } from "@webiny/ui/Chips";
import { Accordion, AccordionItem } from "@webiny/ui/Accordion";
import { Typography } from "@webiny/ui/Typography";
import { Input } from "@webiny/ui/Input";
import styled from "@emotion/styled";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as BasePlusIcon } from "@material-design-icons/svg/outlined/add.svg";

const PlusIcon = styled(BasePlusIcon)`
    fill: white;
    width: 16px;
    height: 16px;
    margin-right: 2px;
`;

const ArrowRight = () => {
    return <span>→</span>;
};

interface ShowDialogParams {}

interface UseConditionalRulesDialogResponse {
    showDialog: (params: ShowDialogParams) => void;
}

interface FormComponentProps {}

const Fieldset = styled("div")({
    display: "flex",
    alignItems: "center",
    columnGap: 10,
    position: "relative",
    width: "100%",
    marginBottom: 15
});

const Header = styled("div")({
    display: "flex",
    justifyContent: "space-between"
});

const DeleteConditionButton = styled(IconButton)``;

const ConditionMessage = styled("span")`
    color: var(--mdc-theme-text-secondary-on-background);
    font-size: 12px;
`;

const FormComponent = (props: FormComponentProps) => {
    const [rules, setRules] = useState([
        {
            id: "rule1",
            conditions: [{ elementId: "", operator: "", value: "" }],
            action: { type: "", pageId: "", elementId: "" }
        }
    ]);

    const addRule = useCallback(() => {
        setRules([
            ...rules,
            {
                id: Math.random().toString(36).substr(2, 9),
                conditions: [{ elementId: "", operator: "", value: "" }],
                action: { type: "", pageId: "", elementId: "" }
            }
        ]);
    });

    const removeRule = useCallback((ruleId: string) => {
        setRules(rules.filter(rule => rule.id !== ruleId));
    });

    const addCondition = (ruleId: string) => {
        setRules(
            rules.map(rule =>
                rule.id === ruleId
                    ? {
                          ...rule,
                          conditions: [
                              ...rule.conditions,
                              { elementId: "", operator: "", value: "" }
                          ]
                      }
                    : rule
            )
        );
    };

    const removeCondition = (ruleId: string, index: number) => {
        setRules(
            rules.map(rule =>
                rule.id === ruleId
                    ? {
                          ...rule,
                          conditions: rule.conditions.filter((_, i) => i !== index)
                      }
                    : rule
            )
        );
    };

    const updateRuleCondition = (
        ruleId: sring,
        index: number,
        newCondition: Record<string, any>
    ) => {
        setRules(
            rules.map(rule =>
                rule.id === ruleId
                    ? {
                          ...rule,
                          conditions: rule.conditions.map((condition, i) =>
                              i === index ? { ...condition, ...newCondition } : condition
                          )
                      }
                    : rule
            )
        );
    };

    const updateRuleAction = (ruleId, newAction) => {
        setRules(
            rules.map(rule =>
                rule.id === ruleId
                    ? {
                          ...rule,
                          action: { ...rule.action, ...newAction }
                      }
                    : rule
            )
        );
    };

    return (
        <Form
            data-testid={"conditional-rules-form"}
            onSubmit={data => {
                console.log("derii", data);
            }}
        >
            {({ Bind, setValue }) => {
                const addCondition = (ruleId: string) => {
                    setValue(
                        "rules",
                        rules.map(rule => {
                            if (rule.id === ruleId) {
                                return {
                                    ...rule,
                                    conditions: [
                                        ...rule.conditions,
                                        {
                                            elementId: "",
                                            operator: "",
                                            value: ""
                                        }
                                    ]
                                };
                            }
                            return rule;
                        })
                    );
                };

                const removeCondition = (ruleId: string, index: number) => {
                    setValue(
                        "rules",
                        rules.map(rule => {
                            if (rule.id === ruleId) {
                                return {
                                    ...rule,
                                    conditions: rule.conditions.filter((_, i) => i !== index)
                                };
                            }
                            return rule;
                        })
                    );
                };

                return (
                    <>
                        <div>
                            <Button onClick={addRule}>
                                <PlusIcon /> Add Rule
                            </Button>
                        </div>
                        <Accordion elevation={1}>
                            {rules.map((rule, ruleIndex) => (
                                <AccordionItem key={ruleIndex} title={`Rule ${ruleIndex + 1}`}>
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
                                                <div key={index}>
                                                    {index > 0 && <span>AND</span>}
                                                    <Chip>
                                                        {condition.elementId} {condition.operator}{" "}
                                                        {condition.value}
                                                    </Chip>
                                                </div>
                                            ))}
                                            <ArrowRight />
                                            <Chip>{rule.action.type}</Chip>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 20
                                            }}
                                        >
                                            <h4>Conditions</h4>

                                            {/*<Accordion elevation={1}>*/}
                                            {/*    <AccordionItem*/}
                                            {/*        key={index}*/}
                                            {/*        title={`Condition ${index + 1}`}*/}
                                            {/*    >*/}
                                            {/*        */}
                                            {/*    </AccordionItem>*/}
                                            {/*</Accordion>*/}

                                            <Bind
                                                name={`rules.${ruleIndex}.conditions`}
                                                defaultValue={[]}
                                            >
                                                <DynamicFieldset>
                                                    {({ actions, header, row, empty }) => (
                                                        <>
                                                            {row(({ index: conditionIndex }) => (
                                                                <Fieldset>
                                                                    <Bind
                                                                        name={`rules.${ruleIndex}.conditions.${conditionIndex}.elementId`}
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
                                                                        onClick={() =>
                                                                            removeCondition(
                                                                                rule.id,
                                                                                index
                                                                            )
                                                                        }
                                                                    />
                                                                </Fieldset>
                                                            ))}
                                                            {empty(() => (
                                                                <Header>
                                                                    <Typography use={"overline"}>
                                                                        Conditions
                                                                    </Typography>
                                                                    <ButtonDefault
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
                        </Accordion>
                    </>
                );
            }}
        </Form>
    );
};

export const useConditionalRulesDialog = (): UseConditionalRulesDialogResponse => {
    const dialogs = useDialogs();
    const { showSnackbar } = useSnackbar();

    const onAccept = useCallback(async (data: GenericFormData) => {
        // const updateData = { ...folder, ...data };

        try {
            // await updateFolder(updateData);
            showSnackbar("Folder permissions updated successfully!");
        } catch (error) {
            showSnackbar(error.message);
        }
    }, []);

    const showDialog = ({}: ShowDialogParams) => {
        dialogs.showDialog({
            title: "Conditional rules",
            content: <FormComponent />,
            acceptLabel: "Save",
            cancelLabel: "Cancel",
            loadingLabel: "Saving conditional rules...",
            onAccept: (data: GenericFormData) => onAccept(data)
        });
    };

    return {
        showDialog
    };
};
