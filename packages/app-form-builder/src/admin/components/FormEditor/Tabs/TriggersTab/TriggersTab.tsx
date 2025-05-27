import React from "react";
import { Form } from "@webiny/form";
import { useFormEditor } from "../../Context";
import { plugins } from "@webiny/plugins";
import set from "lodash/set";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { i18n } from "@webiny/app/i18n";
import { FbEditorTrigger } from "~/types";
import { Accordion, Icon, Text } from "@webiny/admin-ui";
const t = i18n.namespace("FormsApp.Editor.TriggersTab");

export const TriggersTab = () => {
    const { setData, data: formData } = useFormEditor();
    const formEditorTriggerPlugins = plugins.byType<FbEditorTrigger>("form-editor-trigger");
    const { showSnackbar } = useSnackbar();

    return (
        <>
            <Text
                size={"md"}
                as={"div"}
                className={"wby-mb-lg"}
            >{t`Which actions should be taken after submission`}</Text>

            <Accordion>
                {formEditorTriggerPlugins.map(({ trigger }) => (
                    <Accordion.Item
                        key={trigger.id}
                        icon={<Icon icon={trigger.icon} label={trigger.title} />}
                        title={trigger.title}
                        description={trigger.description}
                    >
                        <Form
                            data={formData.triggers?.[trigger.id] || {}}
                            onSubmit={submitData => {
                                // TODO @ts-refactor figure out how to type the data param
                                setData(data => {
                                    return set(data, `triggers.${trigger.id}`, submitData);
                                });
                                showSnackbar(t`Form settings updated successfully.`);
                            }}
                        >
                            {({ Bind, submit }) =>
                                trigger.renderSettings({
                                    Bind,
                                    submit,
                                    form: formData
                                })
                            }
                        </Form>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    );
};
