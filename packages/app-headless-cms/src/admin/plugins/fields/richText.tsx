import React from "react";
import { i18n } from "@webiny/app/i18n";
import { CmsModelFieldTypePlugin } from "~/types";
import { ReactComponent as NotesIcon } from "@webiny/icons/text_snippet.svg";
import { Grid, Input, Label } from "@webiny/admin-ui";
import { Bind } from "@webiny/form";

const t = i18n.ns("app-headless-cms/admin/fields");

const plugin: CmsModelFieldTypePlugin = {
    type: "cms-editor-field-type",
    name: "cms-editor-field-type-richText",
    field: {
        type: "rich-text",
        label: t`Rich text`,
        description: t`Text formatting with references and media.`,
        icon: <NotesIcon />,
        allowMultipleValues: true,
        allowPredefinedValues: false,
        multipleValuesLabel: t`Use as a list of rich texts`,
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
