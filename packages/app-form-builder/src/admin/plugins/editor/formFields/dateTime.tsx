import React from "react";
import { i18n } from "@webiny/app/i18n";
import { ReactComponent as DateIcon } from "@webiny/icons/calendar_month.svg";
import { FbBuilderFieldPlugin } from "~/types";
import { Grid, Select } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/fields");

const plugin: FbBuilderFieldPlugin = {
    type: "form-editor-field-type",
    name: "form-editor-field-type-date-time",
    field: {
        type: "datetime",
        name: "date",
        validators: ["required", "dateGte", "dateLte"],
        label: "Date/Time",
        description: "Renders input for various formats of date and time.",
        icon: <DateIcon />,
        createField() {
            return {
                _id: "",
                fieldId: "",
                type: this.type,
                name: this.name,
                validation: [],
                settings: {
                    defaultValue: "",
                    format: "date"
                }
            };
        },
        renderSettings({ form }) {
            const { Bind } = form;
            return (
                <Grid.Column span={12}>
                    <Bind name={"settings.format"}>
                        <Select
                            label={t`Format`}
                            description={t`Cannot be changed later`}
                            size={"lg"}
                            options={[
                                {
                                    value: "date",
                                    label: t`Date only`
                                },
                                {
                                    value: "time",
                                    label: t`Time only`
                                },
                                {
                                    value: "dateTimeWithTimezone",
                                    label: t`Date and time with timezone`
                                },
                                {
                                    value: "dateTimeWithoutTimezone",
                                    label: t`Date and time without timezone`
                                }
                            ]}
                        />
                    </Bind>
                </Grid.Column>
            );
        }
    }
};

export default plugin;
