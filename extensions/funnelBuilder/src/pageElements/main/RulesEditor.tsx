import { useContext, useState } from "react"
import { FunnelContext } from "@/context/funnel-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ChevronDown, ChevronUp, Plus, Trash2, ArrowRightCircle, CircleDot } from "lucide-react"
import type { Rule, RuleAction, RuleCondition } from "@/lib/types"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

export function RulesEditor() {
    const { funnel, setFunnel } = useContext(FunnelContext)
    const [expandedRules, setExpandedRules] = useState<Record<string, boolean>>({})

    const toggleRuleExpansion = (ruleId: string) => {
        setExpandedRules((prev) => ({
            ...prev,
            [ruleId]: !prev[ruleId],
        }))
    }

    const addRule = () => {
        const newRule: Rule = {
            id: `rule-${Date.now()}`,
            conditions: [
                {
                    elementId: "",
                    operator: "equals",
                    value: "",
                },
            ],
            action: {
                type: "goto",
                pageId: "",
            },
        }

        setFunnel({
            ...funnel,
            rules: [...funnel.rules, newRule],
        })

        // Auto-expand the new rule
        setExpandedRules((prev) => ({
            ...prev,
            [newRule.id]: true,
        }))
    }

    const removeRule = (ruleId: string) => {
        setFunnel({
            ...funnel,
            rules: funnel.rules.filter((rule) => rule.id !== ruleId),
        })
    }

    const updateRuleCondition = (ruleId: string, conditionIndex: number, updates: Partial<RuleCondition>) => {
        setFunnel({
            ...funnel,
            rules: funnel.rules.map((rule) =>
                rule.id === ruleId
                    ? {
                        ...rule,
                        conditions: rule.conditions.map((condition, i) =>
                            i === conditionIndex ? { ...condition, ...updates } : condition,
                        ),
                    }
                    : rule,
            ),
        })
    }

    const addCondition = (ruleId: string) => {
        setFunnel({
            ...funnel,
            rules: funnel.rules.map((rule) =>
                rule.id === ruleId
                    ? {
                        ...rule,
                        conditions: [
                            ...rule.conditions,
                            {
                                elementId: "",
                                operator: "equals",
                                value: "",
                            },
                        ],
                    }
                    : rule,
            ),
        })
    }

    const removeCondition = (ruleId: string, conditionIndex: number) => {
        setFunnel({
            ...funnel,
            rules: funnel.rules.map((rule) =>
                rule.id === ruleId
                    ? {
                        ...rule,
                        conditions:
                            rule.conditions.length > 1 ? rule.conditions.filter((_, i) => i !== conditionIndex) : rule.conditions,
                    }
                    : rule,
            ),
        })
    }

    const updateRuleAction = (ruleId: string, updates: Partial<RuleAction>) => {
        setFunnel({
            ...funnel,
            rules: funnel.rules.map((rule) =>
                rule.id === ruleId
                    ? {
                        ...rule,
                        action: { ...rule.action, ...updates },
                    }
                    : rule,
            ),
        })
    }

    // Get all form elements across all pages
    const allElements = funnel.pages.flatMap((page) =>
        page.elements.map((element) => ({
            id: element.id,
            label: `${element.label} (${page.title})`,
            type: element.type,
        })),
    )

    // Filter to only text and textarea elements for conditions
    const formFields = allElements.filter((element) => element.type === "text" || element.type === "textarea")

    const getElementLabel = (elementId: string) => {
        const element = allElements.find((el) => el.id === elementId)
        return element ? element.label : "Select field"
    }

    const getPageLabel = (pageId: string) => {
        const page = funnel.pages.find((p) => p.id === pageId)
        return page ? page.title : "Select page"
    }

    const getOperatorLabel = (operator: string) => {
        const operatorMap: Record<string, string> = {
            equals: "equals",
            notEquals: "does not equal",
            contains: "contains",
            greaterThan: "is greater than",
            lessThan: "is less than",
        }
        return operatorMap[operator] || operator
    }

    const getActionLabel = (action: RuleAction) => {
        const actionMap: Record<string, string> = {
            goto: "Go to page",
            disable: "Disable field",
            enable: "Enable field",
            show: "Show field",
            hide: "Hide field",
        }

        let label = actionMap[action.type] || action.type

        if (action.type === "goto" && action.pageId) {
            label += `: ${getPageLabel(action.pageId)}`
        } else if (["disable", "enable", "show", "hide"].includes(action.type) && action.elementId) {
            label += `: ${getElementLabel(action.elementId)}`
        }

        return label
    }

    const getActionColor = (actionType: string) => {
        const colorMap: Record<string, string> = {
            goto: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
            disable: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
            enable: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            show: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
            hide: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        }
        return colorMap[actionType] || "bg-secondary text-secondary-foreground"
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Conditional Rules</h3>
                <Button onClick={addRule} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                </Button>
            </div>

            {funnel.rules.length === 0 ? (
                <div className="text-center p-8 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">No rules yet. Add a rule to create conditional logic.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {funnel.rules.map((rule) => (
                        <Card key={rule.id} className="overflow-hidden">
                            <CardHeader className="pb-2 bg-muted/30">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            onClick={() => toggleRuleExpansion(rule.id)}
                                        >
                                            {expandedRules[rule.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </Button>
                                        Rule Flow
                                        <Badge variant="outline" className="ml-2 text-xs font-normal">
                                            {rule.conditions.length} {rule.conditions.length === 1 ? "condition" : "conditions"}
                                        </Badge>
                                    </CardTitle>
                                    <Button variant="ghost" size="icon" onClick={() => removeRule(rule.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>

                            {/* Visual flow representation */}
                            <div className="p-4 border-b bg-muted/10">
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex flex-wrap items-center gap-1 bg-background rounded-md p-1.5 border">
                                        <CircleDot className="h-4 w-4 text-primary" />
                                        <span className="text-sm font-medium">If</span>
                                        {rule.conditions.map((condition, idx) => (
                                            <div key={idx} className="flex items-center">
                                                {idx > 0 && <span className="mx-1 text-xs text-muted-foreground">AND</span>}
                                                <Badge variant="secondary" className="text-xs font-normal">
                                                    {condition.elementId ? getElementLabel(condition.elementId) : "any field"}{" "}
                                                    {getOperatorLabel(condition.operator)} {condition.value || "..."}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>

                                    <ArrowRight className="h-4 w-4 text-muted-foreground mx-1" />

                                    <Badge className={`${getActionColor(rule.action.type)} text-xs font-normal`}>
                                        {getActionLabel(rule.action)}
                                    </Badge>
                                </div>
                            </div>

                            <Collapsible open={expandedRules[rule.id]}>
                                <CollapsibleContent>
                                    <CardContent className="pt-4">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium flex items-center gap-2">
                                                    <CircleDot className="h-4 w-4 text-primary" />
                                                    Conditions
                                                </h4>
                                                {rule.conditions.map((condition, index) => (
                                                    <div
                                                        key={index}
                                                        className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 items-center p-2 rounded-md border bg-background"
                                                    >
                                                        <Select
                                                            value={condition.elementId}
                                                            onValueChange={(value) =>
                                                                updateRuleCondition(rule.id, index, {
                                                                    elementId: value,
                                                                })
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select field" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {formFields.map((field) => (
                                                                    <SelectItem key={field.id} value={field.id}>
                                                                        {field.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>

                                                        <Select
                                                            value={condition.operator}
                                                            onValueChange={(value) =>
                                                                updateRuleCondition(rule.id, index, {
                                                                    operator: value,
                                                                })
                                                            }
                                                        >
                                                            <SelectTrigger className="w-[120px]">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="equals">equals</SelectItem>
                                                                <SelectItem value="notEquals">not equals</SelectItem>
                                                                <SelectItem value="contains">contains</SelectItem>
                                                                <SelectItem value="greaterThan">greater than</SelectItem>
                                                                <SelectItem value="lessThan">less than</SelectItem>
                                                            </SelectContent>
                                                        </Select>

                                                        <Input
                                                            value={condition.value}
                                                            onChange={(e) =>
                                                                updateRuleCondition(rule.id, index, {
                                                                    value: e.target.value,
                                                                })
                                                            }
                                                            placeholder="Value"
                                                        />

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeCondition(rule.id, index)}
                                                            disabled={rule.conditions.length <= 1}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button variant="outline" size="sm" onClick={() => addCondition(rule.id)} className="mt-2">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add Condition
                                                </Button>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-medium flex items-center gap-2">
                                                    <ArrowRightCircle className="h-4 w-4 text-primary" />
                                                    Action
                                                </h4>
                                                <div className="grid grid-cols-[auto_1fr] gap-2 items-center p-2 rounded-md border bg-background">
                                                    <Select
                                                        value={rule.action.type}
                                                        onValueChange={(value) =>
                                                            updateRuleAction(rule.id, {
                                                                type: value,
                                                                ...(value === "goto" ? { pageId: rule.action.pageId || "" } : {}),
                                                                ...(value === "disable" || value === "enable" || value === "show" || value === "hide"
                                                                    ? { elementId: rule.action.elementId || "" }
                                                                    : {}),
                                                            })
                                                        }
                                                    >
                                                        <SelectTrigger className="w-[150px]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="goto">Go to page</SelectItem>
                                                            <SelectItem value="disable">Disable field</SelectItem>
                                                            <SelectItem value="enable">Enable field</SelectItem>
                                                            <SelectItem value="show">Show field</SelectItem>
                                                            <SelectItem value="hide">Hide field</SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    {rule.action.type === "goto" && (
                                                        <Select
                                                            value={rule.action.pageId || ""}
                                                            onValueChange={(value) => updateRuleAction(rule.id, { pageId: value })}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select page" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {funnel.pages.map((page) => (
                                                                    <SelectItem key={page.id} value={page.id}>
                                                                        {page.title}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}

                                                    {(rule.action.type === "disable" ||
                                                        rule.action.type === "enable" ||
                                                        rule.action.type === "show" ||
                                                        rule.action.type === "hide") && (
                                                        <Select
                                                            value={rule.action.elementId || ""}
                                                            onValueChange={(value) => updateRuleAction(rule.id, { elementId: value })}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select field" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {allElements.map((element) => (
                                                                    <SelectItem key={element.id} value={element.id}>
                                                                        {element.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </CollapsibleContent>
                            </Collapsible>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

