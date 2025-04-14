import React, { useState } from "react";
import { plugins } from "@webiny/plugins";
import { OverlayLayout } from "@webiny/app-admin/components/OverlayLayout";
import { LeftPanel, RightPanel, SplitView } from "@webiny/app-admin/components/SplitView";
import { Form } from "@webiny/form";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { i18n } from "@webiny/app/i18n";
import * as SF from "@webiny/app-admin/components/SimpleForm";
import { CmsEditorFormSettingsPlugin } from "~/types";
import { useModelEditor } from "~/admin/hooks";
import { Button, Heading, Icon, List } from "@webiny/admin-ui";

const t = i18n.namespace("FormsApp.Editor.FormSettings");

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
    const cmsEditorFormSettingsPlugins = plugins.byType<CmsEditorFormSettingsPlugin>(
        "cms-editor-form-settings"
    );
    const { data, setData } = useModelEditor();
    const { showSnackbar } = useSnackbar();

    const [activePlugin, setActivePlugin] = useState(cmsEditorFormSettingsPlugins[0]);

    return (
        <OverlayLayout barMiddle={<Title />} onExited={onExited}>
            <SplitView>
                <LeftPanel span={5}>
                    <List>
                        {cmsEditorFormSettingsPlugins.map(pl => (
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
                        data={data}
                        onSubmit={data => {
                            setData(() => data);
                            onExited();
                            showSnackbar(t`Content model settings updated successfully.`);
                        }}
                    >
                        {({ Bind, submit, form, data: formData }) => (
                            <SF.SimpleForm size={"lg"}>
                                <SF.SimpleFormHeader title={activePlugin.title}>
                                    <div className={"wby-flex wby-justify-end wby-items-center"}>
                                        {typeof activePlugin.renderHeaderActions === "function" &&
                                            activePlugin.renderHeaderActions({
                                                Bind,
                                                form,
                                                formData
                                            })}
                                    </div>
                                </SF.SimpleFormHeader>
                                <SF.SimpleFormContent>
                                    {activePlugin
                                        ? activePlugin.render({
                                              Bind: Bind,
                                              form,
                                              formData
                                          })
                                        : null}
                                </SF.SimpleFormContent>
                                <SF.SimpleFormFooter>
                                    <Button
                                        text={t`Save`}
                                        onClick={ev => {
                                            submit(ev);
                                        }}
                                    />
                                </SF.SimpleFormFooter>
                            </SF.SimpleForm>
                        )}
                    </Form>
                </RightPanel>
            </SplitView>
        </OverlayLayout>
    );
};

export default FormSettings;
