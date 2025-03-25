import React from "react";
import { ReactComponent as LongTextIcon } from "@webiny/icons/notes.svg";
import { CmsModelFieldTypePlugin } from "~/types";
import { i18n } from "@webiny/app/i18n";
import { Bind } from "@webiny/form";
import { Grid, Input, Label } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/fields");

const plugin: CmsModelFieldTypePlugin = {
    type: "cms-editor-field-type",
    name: "cms-editor-field-type-long-text",
    field: {
        type: "long-text",
        validators: ["required", "minLength", "maxLength", "pattern"],
        label: t`Long text`,
        description: t`Long comments, notes, multi line values.`,
        icon: <LongTextIcon />,
        allowMultipleValues: true,
        allowPredefinedValues: false, // TODO: implement "renderPredefinedValues" and set to true.
        multipleValuesLabel: t`Use as a list of long texts`,
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
        }
    }
};

export default plugin;
