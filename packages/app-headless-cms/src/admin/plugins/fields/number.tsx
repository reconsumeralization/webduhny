import React from "react";
import { CmsModelFieldTypePlugin } from "~/types";
import { i18n } from "@webiny/app/i18n";
import PredefinedValuesDynamicFieldset from "./PredefinedValuesDynamicFieldset";
import { ReactComponent as FloatIcon } from "@webiny/icons/looks_3.svg";
import { Bind } from "@webiny/form";
import { Grid, Input, Label } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/fields");

const plugin: CmsModelFieldTypePlugin = {
    type: "cms-editor-field-type",
    name: "cms-editor-field-type-number",
    field: {
        type: "number",
        label: t`Number`,
        description: t`Store numbers.`,
        icon: <FloatIcon />,
        validators: ["required", "gte", "lte"],
        allowMultipleValues: true,
        allowPredefinedValues: true,
        multipleValuesLabel: t`Use as a list of numbers`,
        createField() {
            return {
                type: this.type,
                validation: [],
                renderer: {
                    name: ""
                }
            };
        },
        renderSettings() {
            return (
                <Grid>
                    <Grid.Column span={12}>
                        <Bind name={"placeholderText"}>
                            <Input
                                label={
                                    <Label text={t`Placeholder text`} description={t`(optional)`} />
                                }
                                size={"lg"}
                            />
                        </Bind>
                    </Grid.Column>
                </Grid>
            );
        },
        renderPredefinedValues(props) {
            return (
                <PredefinedValuesDynamicFieldset
                    {...props}
                    renderValueInput={Bind => (
                        <Bind name={"value"}>
                            {bind => (
                                <Input
                                    {...bind}
                                    type="number"
                                    label={t`Value`}
                                    onChange={value => bind.onChange(parseFloat(value))}
                                    size={"lg"}
                                />
                            )}
                        </Bind>
                    )}
                />
            );
        }
    }
};

export default plugin;
