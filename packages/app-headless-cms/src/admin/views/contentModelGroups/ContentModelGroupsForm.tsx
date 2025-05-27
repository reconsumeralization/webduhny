import React, { useCallback } from "react";
import { ReactComponent as DevicesIcon } from "@webiny/icons/devices_other.svg";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { Form, FormRenderPropParams } from "@webiny/form";
import { i18n } from "@webiny/app/i18n";
import { validation } from "@webiny/validation";

import {
    SimpleFormHeader,
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent
} from "@webiny/app-admin/components/SimpleForm";
import { IconPicker } from "~/admin/components/IconPicker";
import { useRouter } from "@webiny/react-router";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";
import { useMutation, useQuery } from "../../hooks";
import * as GQL from "./graphql";
import usePermission from "../../hooks/usePermission";
import { Tooltip } from "@webiny/ui/Tooltip";
import {
    CmsGroup,
    CreateCmsGroupMutationResponse,
    CreateCmsGroupMutationVariables,
    GetCmsGroupQueryResponse,
    GetCmsGroupQueryVariables,
    ListCmsGroupsQueryResponse,
    UpdateCmsGroupMutationResponse,
    UpdateCmsGroupMutationVariables
} from "./graphql";
import { Button, Grid, Input, OverlayLoader, Textarea } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/content-model-groups/form");

interface ContentModelGroupsFormProps {
    canCreate: boolean;
}
const ContentModelGroupsForm = ({ canCreate }: ContentModelGroupsFormProps) => {
    const { location, history } = useRouter();
    const { showSnackbar } = useSnackbar();
    const { canEdit } = usePermission();

    const newEntry = new URLSearchParams(location.search).get("new") === "true";
    const id = new URLSearchParams(location.search).get("id");

    const getQuery = useQuery<GetCmsGroupQueryResponse, GetCmsGroupQueryVariables>(
        GQL.GET_CONTENT_MODEL_GROUP,
        {
            variables: {
                id: id as string
            },
            skip: !id,
            onCompleted: data => {
                if (!data) {
                    return;
                }

                const { error } = data.contentModelGroup;
                if (error) {
                    history.push("/cms/content-model-group");
                    showSnackbar(error.message);
                }
            }
        }
    );

    // Create a new group and update list cache
    const [create, createMutation] = useMutation<
        CreateCmsGroupMutationResponse,
        CreateCmsGroupMutationVariables
    >(GQL.CREATE_CONTENT_MODEL_GROUP, {
        update(cache, { data }) {
            if (!data || data.contentModelGroup.error) {
                return;
            }

            const gqlParams = {
                query: GQL.LIST_CONTENT_MODEL_GROUPS
            };
            const result = cache.readQuery<ListCmsGroupsQueryResponse>(gqlParams);
            if (!result || !result.listContentModelGroups) {
                return;
            }
            const { listContentModelGroups } = result;
            cache.writeQuery({
                ...gqlParams,
                data: {
                    listContentModelGroups: {
                        ...listContentModelGroups,
                        data: [data.contentModelGroup.data, ...listContentModelGroups.data]
                    }
                }
            });
        }
    });
    const [update, updateMutation] = useMutation<
        UpdateCmsGroupMutationResponse,
        UpdateCmsGroupMutationVariables
    >(GQL.UPDATE_CONTENT_MODEL_GROUP);

    const loading = [getQuery, createMutation, updateMutation].find(item => item.loading);

    const createOperation = useCallback(
        (group: Partial<CmsGroup>) => {
            if (!group.id) {
                return create({
                    variables: {
                        data: {
                            name: group.name,
                            description: group.description,
                            icon: group.icon
                        }
                    }
                });
            }
            return update({
                variables: {
                    id: group.id,
                    data: {
                        name: group.name,
                        description: group.description,
                        icon: group.icon
                    }
                }
            });
        },
        [create, update]
    );

    const onSubmit = useCallback(
        async (group: Partial<CmsGroup>): Promise<void> => {
            /**
             * Create or update, depends if group object has id property
             */
            const response = await createOperation(group);
            if (!response.data) {
                showSnackbar(`Missing response data ain Content Model Group Mutation Response.`);
                return;
            }

            const { data, error } = response.data.contentModelGroup;
            if (error) {
                showSnackbar(error.message);
                return;
            }
            /**
             * Redirect to a new group
             */
            if (!group.id) {
                history.push(`/cms/content-model-groups?id=${data.id}`);
            }
            showSnackbar(t`Content model group saved successfully!`);
        },
        [id]
    );

    const data: CmsGroup | null = getQuery.loading
        ? null
        : get(getQuery, "data.contentModelGroup.data", null);

    const showEmptyView = !newEntry && !loading && isEmpty(data);
    // Render "No content selected" view.
    if (showEmptyView) {
        return (
            <EmptyView
                icon={<DevicesIcon />}
                title={t`Click on the left side list to display group details {message}`({
                    message: canCreate ? "or create a..." : ""
                })}
                action={
                    canCreate ? (
                        <Button
                            text={t`New Group`}
                            icon={<AddIcon />}
                            data-testid="new-record-button"
                            onClick={() => history.push("/cms/content-model-groups?new=true")}
                        />
                    ) : (
                        <></>
                    )
                }
            />
        );
    }

    return (
        <Form onSubmit={onSubmit} data={data || { icon: "fas/star" }}>
            {({ data, form, Bind }: FormRenderPropParams<CmsGroup>) => (
                <SimpleForm data-testid={"pb-content-model-groups-form"}>
                    <SimpleFormHeader title={data.name ? data.name : t`New content model group`} />
                    {loading && <OverlayLoader />}
                    <SimpleFormContent>
                        <Grid>
                            <Grid.Column span={12}>
                                <Bind
                                    name="name"
                                    validators={validation.create("required,maxLength:100")}
                                >
                                    <Input
                                        size={"lg"}
                                        data-testid={"cms.form.group.name"}
                                        label={t`Name`}
                                    />
                                </Bind>
                            </Grid.Column>

                            <Grid.Column span={12}>
                                <Bind name="icon" validators={validation.create("required")}>
                                    <IconPicker
                                        label={t`Group icon`}
                                        description={t`Icon that will be displayed in the main menu.`}
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind name="description">
                                    <Textarea
                                        size={"lg"}
                                        data-testid={"cms.form.group.description"}
                                        rows={5}
                                        label={t`Description`}
                                    />
                                </Bind>
                            </Grid.Column>
                        </Grid>
                    </SimpleFormContent>
                    <SimpleFormFooter>
                        <Button
                            variant={"secondary"}
                            text={t`Cancel`}
                            onClick={() => history.push("/cms/content-model-groups")}
                        />

                        {canEdit(data, "cms.contentModelGroup") && (
                            <React.Fragment>
                                {!data.plugin ? (
                                    <Button
                                        variant={"primary"}
                                        text={t`Save`}
                                        onClick={ev => {
                                            form.submit(ev);
                                        }}
                                        data-testid={"cms.form.group.submit"}
                                    />
                                ) : (
                                    <Tooltip
                                        content={"Content model group is registered via a plugin."}
                                        placement={"bottom"}
                                    >
                                        <Button
                                            disabled
                                            variant={"primary"}
                                            text={t`Save`}
                                            data-testid={"cms.form.group.submit"}
                                        />
                                    </Tooltip>
                                )}
                            </React.Fragment>
                        )}
                    </SimpleFormFooter>
                </SimpleForm>
            )}
        </Form>
    );
};

export default ContentModelGroupsForm;
