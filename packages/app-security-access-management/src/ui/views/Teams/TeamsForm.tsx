import React, { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import pick from "lodash/pick";
import get from "lodash/get";
import { useRouter } from "@webiny/react-router";
import { i18n } from "@webiny/app/i18n";
import { Form } from "@webiny/form";
import { validation } from "@webiny/validation";
import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { CREATE_TEAM, LIST_TEAMS, READ_TEAM, UPDATE_TEAM } from "./graphql";
import isEmpty from "lodash/isEmpty";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";
import { GroupsMultiAutocomplete } from "~/components/GroupsMultiAutocomplete";
import { Team } from "~/types";
import { ReactComponent as SettingsIcon } from "@webiny/icons/settings.svg";
import { Alert, Button, Grid, Input, OverlayLoader, Textarea } from "@webiny/admin-ui";

const t = i18n.ns("app-security/admin/teams/form");

export interface TeamsFormProps {
    // TODO @ts-refactor delete and go up the tree and sort it out
    [key: string]: any;
}

export const TeamsForm = () => {
    const { location, history } = useRouter();
    const { showSnackbar } = useSnackbar();
    const newTeam = new URLSearchParams(location.search).get("new") === "true";
    const id = new URLSearchParams(location.search).get("id");

    const getQuery = useQuery(READ_TEAM, {
        variables: { id },
        skip: !id,
        onCompleted: data => {
            if (!data) {
                return;
            }

            const { error } = data.security.team;
            if (error) {
                history.push("/access-management/teams");
                showSnackbar(error.message);
            }
        }
    });

    const [create, createMutation] = useMutation(CREATE_TEAM, {
        refetchQueries: [{ query: LIST_TEAMS }]
    });

    const [update, updateMutation] = useMutation(UPDATE_TEAM, {
        refetchQueries: [{ query: LIST_TEAMS }]
    });

    const loading = [getQuery, createMutation, updateMutation].find(item => item.loading);

    const onSubmit = useCallback(
        async (formData: Team) => {
            const isUpdate = formData.createdOn;
            const [operation, args] = isUpdate
                ? [
                      update,
                      {
                          variables: {
                              id: formData.id,
                              data: pick(formData, ["name", "description", "groups"])
                          }
                      }
                  ]
                : [
                      create,
                      {
                          variables: {
                              data: pick(formData, ["name", "slug", "description", "groups"])
                          }
                      }
                  ];

            const response = await operation(args);

            const { data: team, error } = response.data.security.team;
            if (error) {
                return showSnackbar(error.message);
            }

            !isUpdate && history.push(`/access-management/teams?id=${team.id}`);
            showSnackbar(t`Team saved successfully!`);
        },
        [id]
    );

    const data = loading ? {} : get(getQuery, "data.security.team.data", {});

    const systemTeam = data.system;
    const pluginTeam = data.plugin;
    const canModifyTeam = !systemTeam && !pluginTeam;

    const showEmptyView = !newTeam && !loading && isEmpty(data);
    // Render "No content" selected view.
    if (showEmptyView) {
        return (
            <EmptyView
                icon={<SettingsIcon />}
                title={t`Click on the left side list to display team details or create a...`}
                action={
                    <Button
                        text={t`New Team`}
                        icon={<AddIcon />}
                        data-testid="new-record-button"
                        onClick={() => history.push("/access-management/teams?new=true")}
                    />
                }
            />
        );
    }

    return (
        <Form data={data} onSubmit={onSubmit}>
            {({ data, form, Bind }) => {
                return (
                    <SimpleForm>
                        {loading && <OverlayLoader />}
                        <SimpleFormHeader title={data.name ? data.name : "Untitled"} />
                        <SimpleFormContent>
                            <Grid>
                                <>
                                    {systemTeam && (
                                        <Grid.Column span={12}>
                                            <Alert type={"info"} title={"Permissions are locked"}>
                                                This is a protected system team and you can&apos;t
                                                modify its permissions.
                                            </Alert>
                                        </Grid.Column>
                                    )}
                                    {pluginTeam && (
                                        <Grid.Column span={12}>
                                            <Alert type={"info"} title={"Important"}>
                                                This team is registered via an extension, and cannot
                                                be modified.
                                            </Alert>
                                        </Grid.Column>
                                    )}
                                </>
                                <Grid.Column span={6}>
                                    <Bind
                                        name="name"
                                        validators={validation.create("required,minLength:3")}
                                    >
                                        <Input
                                            size={"lg"}
                                            disabled={!canModifyTeam}
                                            label={t`Name`}
                                            data-testid="admin.am.team.new.name"
                                        />
                                    </Bind>
                                </Grid.Column>
                                <Grid.Column span={6}>
                                    <Bind
                                        name="slug"
                                        validators={validation.create("required,minLength:3")}
                                    >
                                        <Input
                                            size={"lg"}
                                            disabled={!canModifyTeam || !newTeam}
                                            label={t`Slug`}
                                            data-testid="admin.am.team.new.slug"
                                        />
                                    </Bind>
                                </Grid.Column>
                                <Grid.Column span={12}>
                                    <Bind
                                        name="description"
                                        validators={validation.create("maxLength:500")}
                                    >
                                        <Textarea
                                            size={"lg"}
                                            disabled={!canModifyTeam}
                                            label={t`Description`}
                                            rows={3}
                                            data-testid="admin.am.team.new.description"
                                        />
                                    </Bind>
                                </Grid.Column>
                                <Grid.Column span={12}>
                                    <Bind name="groups" validators={validation.create("required")}>
                                        <GroupsMultiAutocomplete
                                            disabled={!canModifyTeam}
                                            label={t`Roles`}
                                            data-testid="admin.am.team.new.groups"
                                        />
                                    </Bind>
                                </Grid.Column>
                            </Grid>
                        </SimpleFormContent>
                        <SimpleFormFooter>
                            <Button
                                variant={"secondary"}
                                text={t`Cancel`}
                                onClick={() => history.push("/access-management/teams")}
                            />
                            {canModifyTeam && (
                                <Button
                                    text={t`Save`}
                                    data-testid="admin.am.team.new.save"
                                    onClick={ev => {
                                        form.submit(ev);
                                    }}
                                />
                            )}
                        </SimpleFormFooter>
                    </SimpleForm>
                );
            }}
        </Form>
    );
};
