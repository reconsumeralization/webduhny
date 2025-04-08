import React, { useState } from "react";
import { plugins } from "@webiny/plugins";
import { OverlayLayout } from "@webiny/app-admin/components/OverlayLayout";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { Form } from "@webiny/form";
import { useFormEditor } from "~/admin/components/FormEditor";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";

import { i18n } from "@webiny/app/i18n";
const t = i18n.namespace("FormsApp.Editor.FormSettings");

import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import { FbEditorFormSettingsPlugin } from "~/types";
import { Button, Heading, Icon, List } from "@webiny/admin-ui";

const Title = () => {
    return (
        <Heading
            level={5}
            className={"wby-text-neutral-strong"}
        >{t`Content model settings`}</Heading>
    );
};

interface FormSettingsProps {
    onExited: () => void;
}

const FormSettings = ({ onExited }: FormSettingsProps) => {
    const formEditorSettingsPlugins = plugins.byType<FbEditorFormSettingsPlugin>(
        "form-editor-form-settings"
    );
    const { data, setData } = useFormEditor();
    const { showSnackbar } = useSnackbar();

    const [activePlugin, setActivePlugin] = useState(formEditorSettingsPlugins[0]);

    return (
        <OverlayLayout barMiddle={<Title />} onExited={onExited}>
            <SplitView>
                <LeftPanel span={5}>
                    <List>
                        {formEditorSettingsPlugins.map(pl => (
                            <List.Item
                                key={pl.name}
                                onClick={() => setActivePlugin(pl)}
                                icon={<Icon label={pl.title} icon={pl.icon} />}
                                title={pl.title}
                                description={pl.description}
                            />
                        ))}
                    </List>
                </LeftPanel>
                <RightPanel span={7}>
                    <Form
                        data={data.settings}
                        onSubmit={settings => {
                            setData(data => {
                                data.settings = settings;
                                return data;
                            });
                            onExited();
                            showSnackbar(t`Form settings updated successfully.`);
                        }}
                    >
                        {({ Bind, submit, form, data: formData }) => (
                            <SimpleForm size={"lg"}>
                                <SimpleFormHeader title={activePlugin.title}>
                                    <div className={"wby-flex wby-justify-end wby-items-center"}>
                                        {typeof activePlugin.renderHeaderActions === "function" &&
                                            activePlugin.renderHeaderActions({
                                                Bind,
                                                form,
                                                formData
                                            })}
                                    </div>
                                </SimpleFormHeader>
                                <SimpleFormContent>
                                    {activePlugin
                                        ? activePlugin.render({ Bind, form, formData })
                                        : null}
                                </SimpleFormContent>
                                <SimpleFormFooter>
                                    <Button
                                        text={t`Save`}
                                        onClick={ev => {
                                            submit(ev);
                                        }}
                                    />
                                </SimpleFormFooter>
                            </SimpleForm>
                        )}
                    </Form>
                </RightPanel>
            </SplitView>
        </OverlayLayout>
    );
};

export default FormSettings;
