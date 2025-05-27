import React, { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import { useRouter } from "@webiny/react-router";
import { i18n } from "@webiny/app/i18n";
import { Form } from "@webiny/form";
import { Permissions } from "@webiny/app-admin/components/Permissions";
import { validation } from "@webiny/validation";
import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { pickDataForAPI } from "./utils";
import * as GQL from "./graphql";
import isEmpty from "lodash/isEmpty";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as CopyIcon } from "@webiny/icons/content_copy.svg";
import { ReactComponent as SettingsIcon } from "@webiny/icons/settings.svg";
import { ApiKey } from "~/types";
import {
    Alert,
    Button,
    CopyButton,
    Grid,
    IconButton,
    Input,
    Label,
    OverlayLoader,
    Textarea,
    Tooltip
} from "@webiny/admin-ui";

const t = i18n.ns("app-security-admin-users/admin/api-keys/form");

export interface ApiKeyFormProps {
    // TODO @ts-refactor delete and go up the tree and sort it out
    [key: string]: any;
}

export const ApiKeyForm = () => {
    const { location, history } = useRouter();
    const { showSnackbar } = useSnackbar();
    const newEntry = new URLSearchParams(location.search).get("new") === "true";
    const id = new URLSearchParams(location.search).get("id");

    const getQuery = useQuery(GQL.READ_API_KEY, {
        variables: { id },
        skip: !id,
        onCompleted: data => {
            if (!data) {
                return;
            }

            const { error } = data.security.apiKey;
            if (error) {
                history.push("/access-management/api-keys");
                showSnackbar(error.message);
            }
        }
    });

    const [create, createMutation] = useMutation(GQL.CREATE_API_KEY, {
        refetchQueries: [{ query: GQL.LIST_API_KEYS }]
    });

    const [update, updateMutation] = useMutation(GQL.UPDATE_API_KEY, {
        refetchQueries: [{ query: GQL.LIST_API_KEYS }]
    });

    const loading = [getQuery, createMutation, updateMutation].find(item => item.loading);

    const onSubmit = useCallback(
        async (formData: ApiKey) => {
            if (!formData.permissions || !formData.permissions.length) {
                showSnackbar(t`You must configure permissions before saving!`, {
                    timeout: 60000,
                    dismissesOnAction: true
                });
                return;
            }

            const isUpdate = formData.createdOn;
            const [operation, args] = isUpdate
                ? [update, { variables: { id: formData.id, data: pickDataForAPI(formData) } }]
                : [create, { variables: { data: pickDataForAPI(formData) } }];

            const response = await operation(args);

            const { error } = response.data.security.apiKey;
            if (error) {
                return showSnackbar(error.message);
            }

            const { id } = response.data.security.apiKey.data;

            !isUpdate && history.push(`/access-management/api-keys?id=${id}`);
            showSnackbar(t`API key saved successfully.`);
        },
        [id]
    );

    const data: ApiKey = get(getQuery, "data.security.apiKey.data", {});

    const showEmptyView = !newEntry && !loading && isEmpty(data);
    // Render "No content" selected view.
    if (showEmptyView) {
        return (
            <EmptyView
                icon={<SettingsIcon />}
                title={t`Click on the left side list to display API key details or create a...`}
                action={
                    <Button
                        icon={<AddIcon />}
                        text={t`New API Key`}
                        data-testid="new-record-button"
                        onClick={() => history.push("/access-management/api-keys?new=true")}
                    />
                }
            />
        );
    }

    return (
        <Form data={data} onSubmit={onSubmit}>
            {({ data, form, Bind }) => {
                return (
                    <SimpleForm size={"lg"}>
                        {loading && <OverlayLoader />}
                        <SimpleFormHeader title={data.name ? data.name : "Untitled"} />
                        <SimpleFormContent>
                            <Grid>
                                <Grid.Column span={12}>
                                    <Bind name="name" validators={validation.create("required")}>
                                        <Input
                                            size={"lg"}
                                            label={t`Name`}
                                            data-testid="sam.key.new.form.name"
                                        />
                                    </Bind>
                                </Grid.Column>
                                <Grid.Column span={12}>
                                    <Bind
                                        name="description"
                                        validators={validation.create("required")}
                                    >
                                        <Textarea
                                            size={"lg"}
                                            label={t`Description`}
                                            rows={4}
                                            data-testid="sam.key.new.form.description"
                                        />
                                    </Bind>
                                </Grid.Column>
                                <Grid.Column span={12}>
                                    <div>
                                        <Label text={t`Token`} />
                                        {data.token ? (
                                            <div
                                                className={
                                                    "wby-py-sm wby-pl-sm-extra wby-pr-xs wby-rounded-md wby-mt-xs wby-bg-neutral-disabled wby-flex wby-justify-between wby-items-center"
                                                }
                                            >
                                                <div>{data.token}</div>
                                                <CopyButton
                                                    variant={"ghost"}
                                                    value={data.token}
                                                    onCopy={() =>
                                                        showSnackbar("Successfully copied!")
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <Alert className={"wby-mt-xs"}>
                                                {
                                                    "Your token will be shown once you submit the form."
                                                }
                                            </Alert>
                                        )}
                                    </div>
                                </Grid.Column>
                            </Grid>
                        </SimpleFormContent>
                        <SimpleFormHeader title={"Permissions"} rounded={false}>
                            <div className={"wby-flex wby-justify-end"}>
                                <Tooltip
                                    content="Copy permissions as JSON"
                                    trigger={
                                        <IconButton
                                            variant={"ghost"}
                                            icon={<CopyIcon />}
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    JSON.stringify(data.permissions, null, 2)
                                                );
                                                showSnackbar("JSON data copied to clipboard.");
                                            }}
                                        />
                                    }
                                />
                            </div>
                        </SimpleFormHeader>
                        <SimpleFormContent>
                            <Grid>
                                <Grid.Column span={12}>
                                    <Bind name={"permissions"} defaultValue={[]}>
                                        {bind => <Permissions id={data.id || "new"} {...bind} />}
                                    </Bind>
                                </Grid.Column>
                            </Grid>
                        </SimpleFormContent>
                        <SimpleFormFooter>
                            <Button
                                variant={"secondary"}
                                text={t`Cancel`}
                                onClick={() => history.push("/access-management/api-keys")}
                                data-testid="sam.key.new.form.button.cancel"
                            />
                            <Button
                                text={t`Save`}
                                data-testid="sam.key.new.form.button.save"
                                onClick={ev => {
                                    form.submit(ev);
                                }}
                            />
                        </SimpleFormFooter>
                    </SimpleForm>
                );
            }}
        </Form>
    );
};
