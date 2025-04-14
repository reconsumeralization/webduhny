import React from "react";
import { i18n } from "@webiny/app/i18n";
import { CmsModelFieldRendererPlugin } from "~/types";
import { Fields } from "~/admin/components/ContentEntryForm/Fields";
import { FieldSettings } from "./FieldSettings";
import { ParentFieldProvider } from "~/admin/components/ContentEntryForm/ParentValue";
import { ParentValueIndexProvider } from "~/admin/components/ModelFieldProvider";
import { fieldsGridStyle } from "./StyledComponents";
import { FormComponentDescription, Heading } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/fields/text");

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-object",
    renderer: {
        rendererName: "object",
        name: t`Inline Form`,
        description: t`Renders a set of fields.`,
        canUse({ field }) {
            return field.type === "object" && !field.multipleValues;
        },
        render({ field, getBind, contentModel }) {
            const Bind = getBind();

            const fieldSettings = FieldSettings.createFrom(field);

            if (!fieldSettings.hasFields()) {
                fieldSettings.logMissingFields();
                return null;
            }

            const settings = fieldSettings.getSettings();

            return (
                <Bind>
                    {bindProps => (
                        <Bind.ValidationContainer>
                            <ParentFieldProvider value={bindProps.value} path={Bind.parentName}>
                                <ParentValueIndexProvider index={-1}>
                                    <div className={"wby-pb-sm"}>
                                        <Heading level={6} className={"webiny_group-label-text"}>
                                            {field.label}
                                        </Heading>
                                        {field.helpText && (
                                            <FormComponentDescription>
                                                {field.helpText}
                                            </FormComponentDescription>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            "wby-p-md wby-border-sm wby-border-neutral-dimmed-darker wby-rounded-md"
                                        }
                                    >
                                        <Fields
                                            gridClassName={fieldsGridStyle}
                                            Bind={Bind}
                                            contentModel={contentModel}
                                            fields={settings.fields}
                                            layout={settings.layout}
                                        />
                                    </div>
                                </ParentValueIndexProvider>
                            </ParentFieldProvider>
                        </Bind.ValidationContainer>
                    )}
                </Bind>
            );
        }
    }
};

export default plugin;
