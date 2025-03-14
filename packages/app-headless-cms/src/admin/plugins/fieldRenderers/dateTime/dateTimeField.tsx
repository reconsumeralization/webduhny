import React from "react";
import get from "lodash/get";
import { CmsModelFieldRendererPlugin } from "~/types";
import { i18n } from "@webiny/app/i18n";
import { DateOnly } from "./DateOnly";
import { DateTimeWithoutTimezone } from "./DateTimeWithoutTimezone";
import { DateTimeWithTimezone } from "./DateTimeWithTimezone";
import { Time } from "./Time";

const t = i18n.ns("app-headless-cms/admin/fields/date-time");

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-date-time",
    renderer: {
        rendererName: "date-time-input",
        name: t`Date/Time Input`,
        description: t`Renders input for various formats of date and time.`,
        canUse({ field }) {
            return (
                field.type === "datetime" &&
                !field.multipleValues &&
                !get(field, "predefinedValues.enabled")
            );
        },
        render({ field, getBind }) {
            const Bind = getBind();

            const fieldSettingsType = field.settings ? field.settings.type : null;

            let Component = DateOnly;
            switch (fieldSettingsType) {
                case "dateTimeWithoutTimezone":
                    Component = DateTimeWithoutTimezone;
                    break;
                case "dateTimeWithTimezone":
                    Component = DateTimeWithTimezone;
                    break;
                case "time":
                    Component = Time;
                    break;
            }

            return (
                <Bind>
                    {bind => {
                        return (
                            <Bind.ValidationContainer>
                                <Component bind={bind} field={field} />
                            </Bind.ValidationContainer>
                        );
                    }}
                </Bind>
            );
        }
    }
};

export default plugin;
