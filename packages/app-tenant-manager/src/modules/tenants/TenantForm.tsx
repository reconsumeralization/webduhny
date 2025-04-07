import React from "react";
import { i18n } from "@webiny/app/i18n";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as TenantIcon } from "@webiny/icons/domain.svg";
import { Form } from "@webiny/form";
import { Tags } from "@webiny/ui/Tags";
import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import { validation } from "@webiny/validation";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { useTenantForm } from "./hooks/useTenantForm";
import { TenantFormFields } from "~/components/TenantFormFields";
import SingleImageUpload from "@webiny/app-admin/components/SingleImageUpload";
import { Button, Grid, Input, OverlayLoader, Textarea } from "@webiny/admin-ui";

const t = i18n.ns("app-i18n/admin/locales/form");

const TenantForm = () => {
    const { loading, showEmptyView, createTenant, cancelEditing, tenant, onSubmit } =
        useTenantForm();

    // Render "No content" selected view.
    if (showEmptyView) {
        return (
            <EmptyView
                icon={<TenantIcon />}
                title={t`Click on the left side list to display tenant details or create a...`}
                action={
                    <Button
                        text={t`New Tenant`}
                        icon={<AddIcon />}
                        data-testid="new-record-button"
                        onClick={createTenant}
                    />
                }
            />
        );
    }

    return (
        <Form data={{ ...tenant }} onSubmit={onSubmit}>
            {({ data, form, Bind }) => (
                <SimpleForm data-testid={"tenant-form"}>
                    {loading && <OverlayLoader />}
                    <SimpleFormHeader title={data.name || t`New tenant`} />
                    <SimpleFormContent>
                        <Grid>
                            <Grid.Column span={12}>
                                <Bind name="name" validators={validation.create("required")}>
                                    <Input size="lg" label={"Name"} />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind name="description" validators={validation.create("required")}>
                                    <Textarea size={"lg"} label={"Description"} rows={4} />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind name={"image"}>
                                    <SingleImageUpload label="Logo" />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind
                                    name="tags"
                                    validators={validation.create("required")}
                                    defaultValue={[]}
                                >
                                    <Tags label={"Tags"} />
                                </Bind>
                            </Grid.Column>
                            <TenantFormFields />
                        </Grid>
                    </SimpleFormContent>
                    <SimpleFormFooter>
                        <Button
                            variant={"secondary"}
                            text={t`Cancel`}
                            onClick={cancelEditing}
                            data-testid="tenant.new.form.button.cancel"
                        />
                        <Button
                            text={t`Save`}
                            data-testid="tenant.new.form.button.save"
                            onClick={form.submit}
                        />
                    </SimpleFormFooter>
                </SimpleForm>
            )}
        </Form>
    );
};

export default TenantForm;
