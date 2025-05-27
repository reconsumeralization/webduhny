import React, { Fragment } from "react";
import { CenteredView } from "@webiny/app-admin";
import { Form } from "@webiny/form";
import {
    SimpleForm,
    SimpleFormContent,
    SimpleFormFooter,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import { usePbWebsiteSettings } from "./usePbWebsiteSettings";
import { WebsiteSettingsConfig } from "~/modules/WebsiteSettings/config/WebsiteSettingsConfig";

import { Button, Grid, OverlayLoader } from "@webiny/admin-ui";

export const WebsiteSettingsView = () => {
    const { fetching, saving, settings, saveSettings } = usePbWebsiteSettings();
    const { groups } = WebsiteSettingsConfig.useWebsiteSettingsConfig();

    return (
        <CenteredView>
            <Form data={settings} onSubmit={saveSettings}>
                {({ submit }) => (
                    <SimpleForm>
                        {fetching && <OverlayLoader text={"Loading settings..."} />}
                        {saving && <OverlayLoader text={"Saving settings..."} />}
                        {groups.map((group, index) => (
                            <Fragment key={group.name}>
                                <SimpleFormHeader title={group.label} rounded={index === 0} />
                                <SimpleFormContent>
                                    <Grid>
                                        {(group.elements || []).map(el => (
                                            <Grid.Column key={el.name} span={12}>
                                                {el.element}
                                            </Grid.Column>
                                        ))}
                                    </Grid>
                                </SimpleFormContent>
                            </Fragment>
                        ))}
                        <SimpleFormFooter>
                            <Button
                                text={"Save"}
                                onClick={ev => {
                                    submit(ev);
                                }}
                            />
                        </SimpleFormFooter>
                    </SimpleForm>
                )}
            </Form>
        </CenteredView>
    );
};
