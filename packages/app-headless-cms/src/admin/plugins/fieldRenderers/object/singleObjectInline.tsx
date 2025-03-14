import React from "react";
import styled from "@emotion/styled";
import { i18n } from "@webiny/app/i18n";
import { FormElementMessage } from "@webiny/ui/FormElementMessage";
import { CmsModelFieldRendererPlugin } from "~/types";
import { Fields } from "~/admin/components/ContentEntryForm/Fields";
import { FieldSettings } from "./FieldSettings";
import { ParentFieldProvider } from "~/admin/components/ContentEntryForm/ParentValue";
import { ParentValueIndexProvider } from "~/admin/components/ModelFieldProvider";
import { fieldsGridStyle } from "./StyledComponents";
import { Typography } from "@webiny/ui/Typography";

const t = i18n.ns("app-headless-cms/admin/fields/text");

const FieldLabel = styled.div`
    font-size: 24px;
    font-weight: normal;
    border-bottom: 1px solid var(--mdc-theme-background);
    margin-bottom: 20px;
    padding-bottom: 5px;
`;

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
                                    <FieldLabel>
                                        <Typography use={"headline5"}>{field.label}</Typography>
                                        {field.helpText && (
                                            <FormElementMessage>
                                                {field.helpText}
                                            </FormElementMessage>
                                        )}
                                    </FieldLabel>
                                    <Fields
                                        gridClassName={fieldsGridStyle}
                                        Bind={Bind}
                                        contentModel={contentModel}
                                        fields={settings.fields}
                                        layout={settings.layout}
                                    />
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
