import React from "react";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as LocaleIcon } from "@webiny/icons/translate.svg";
import { i18n } from "@webiny/app/i18n";
import { Form } from "@webiny/form";
import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import { validation } from "@webiny/validation";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import LocaleCodesAutoComplete from "~/admin/components/LocaleCodesAutoComplete";
import { useLocaleForm } from "./hooks/useLocaleForm";
import { Button, Grid, OverlayLoader, Switch } from "@webiny/admin-ui";

const t = i18n.ns("app-i18n/admin/locales/form");

const I18NLocaleForm = () => {
    const { loading, showEmptyView, createLocale, cancelEditing, locale, onSubmit } =
        useLocaleForm();

    // Render "No content" selected view.
    if (showEmptyView) {
        return (
            <EmptyView
                icon={<LocaleIcon />}
                title={t`Click on the left side list to display locale details or create a...`}
                action={
                    <Button
                        text={t`New Locale`}
                        icon={<AddIcon />}
                        data-testid="new-record-button"
                        onClick={createLocale}
                    />
                }
            />
        );
    }

    return (
        <Form data-testid={"i18n-locale-form"} data={locale} onSubmit={onSubmit}>
            {({ data, form, Bind }) => (
                <SimpleForm>
                    {loading && <OverlayLoader />}
                    <SimpleFormHeader title={data.code || t`New locale`} />
                    <SimpleFormContent>
                        <Grid>
                            <Grid.Column span={12}>
                                <Bind name="code" validators={validation.create("required")}>
                                    <LocaleCodesAutoComplete
                                        disabled={Boolean(data.createdOn)}
                                        label={t`Code`}
                                        data-testid="l18n.locale.code"
                                        description={t`For example: "en-GB"`}
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind name="default">
                                    <Switch label={t`Default locale`} />
                                </Bind>
                            </Grid.Column>
                        </Grid>
                    </SimpleFormContent>
                    <SimpleFormFooter>
                        <Button variant={"secondary"} text={t`Cancel`} onClick={cancelEditing} />
                        <Button
                            text={t`Save`}
                            onClick={ev => {
                                form.submit(ev);
                            }}
                            data-testid="l18n.locale.save"
                        />
                    </SimpleFormFooter>
                </SimpleForm>
            )}
        </Form>
    );
};

export default I18NLocaleForm;
