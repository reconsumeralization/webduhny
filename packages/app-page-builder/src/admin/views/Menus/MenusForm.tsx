import React, { useCallback, useMemo } from "react";
import { i18n } from "@webiny/app/i18n";
import { Form } from "@webiny/form";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as TableIcon } from "@webiny/icons/table_chart.svg";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import { validation } from "@webiny/validation";
import {
    GET_MENU,
    CREATE_MENU,
    UPDATE_MENU,
    LIST_MENUS,
    GetMenuQueryResponse,
    GetMenuQueryVariables
} from "./graphql";
import { useRouter } from "@webiny/react-router";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import MenuItems from "./MenusForm/MenuItems";
import pick from "lodash/pick";
import get from "lodash/get";
import set from "lodash/set";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { useMenusPermissions } from "~/hooks/permissions";
import { PbMenu } from "~/types";
import { Button, Grid, Input, OverlayLoader, Textarea } from "@webiny/admin-ui";

const t = i18n.ns("app-page-builder/admin/menus/form");

interface MenusFormProps {
    canCreate: boolean;
}

const MenusForm = ({ canCreate }: MenusFormProps) => {
    const { location, history } = useRouter();
    const { showSnackbar } = useSnackbar();

    const newEntry = new URLSearchParams(location.search).get("new") === "true";
    const slug = new URLSearchParams(location.search).get("slug");

    const getQuery = useQuery(GET_MENU, {
        variables: { slug },
        skip: !slug,
        onCompleted: data => {
            const error = data?.pageBuilder?.getMenu?.error;
            if (error) {
                history.push("/page-builder/menus");
                showSnackbar(error.message);
            }
        }
    });

    const [create, createMutation] = useMutation(CREATE_MENU, {
        refetchQueries: [{ query: LIST_MENUS }]
    });

    const [update, updateMutation] = useMutation(UPDATE_MENU, {
        refetchQueries: [{ query: LIST_MENUS }],
        update: (cache, { data }) => {
            const dataFromCache = cache.readQuery<GetMenuQueryResponse, GetMenuQueryVariables>({
                query: GET_MENU,
                variables: {
                    slug: slug as string
                }
            });
            const updatedData = get(data, "pageBuilder.menu.data");

            if (updatedData && dataFromCache) {
                cache.writeQuery<GetMenuQueryResponse, GetMenuQueryVariables>({
                    query: GET_MENU,
                    data: set(dataFromCache, "pageBuilder.getMenu.data", updatedData)
                });
            }
        }
    });

    const loadedMenu = getQuery.data?.pageBuilder?.getMenu?.data || {};

    const loading = [getQuery, createMutation, updateMutation].find(item => item.loading);

    const onSubmit = useCallback(
        async (formData: PbMenu) => {
            const isUpdate = loadedMenu.slug;
            const data = pick(formData, ["slug", "title", "description", "items"]);

            // We need to ensure `description` is always a string. Otherwise, backend validation will fail.
            if (!data.description) {
                data.description = "";
            }

            const [operation, args] = isUpdate
                ? [update, { variables: { slug: data.slug, data } }]
                : [create, { variables: { data: data } }];

            const response = await operation(args);

            const error = response?.data?.pageBuilder?.menu?.error;
            if (error) {
                return showSnackbar(error.message);
            }

            !isUpdate && history.push(`/page-builder/menus?slug=${formData.slug}`);
            showSnackbar(t`Menu saved successfully.`);
        },
        [loadedMenu.slug]
    );

    const data = useMemo(() => {
        const data = getQuery.data?.pageBuilder?.getMenu.data || {};
        if (!data.items) {
            data.items = [];
        }
        return data;
    }, [loadedMenu.slug]);

    const { canWrite } = useMenusPermissions();

    const showEmptyView = !newEntry && !loading && isEmpty(omit(data, "items"));
    // Render "No content selected" view.
    if (showEmptyView) {
        return (
            <EmptyView
                icon={<TableIcon />}
                title={t`Click on the left side list to display menu details {message}`({
                    message: canCreate ? "or create a..." : ""
                })}
                action={
                    canCreate ? (
                        <Button
                            text={t`New Menu`}
                            icon={<AddIcon />}
                            data-testid="new-record-button"
                            onClick={() => history.push("/page-builder/menus?new=true")}
                        />
                    ) : (
                        <></>
                    )
                }
            />
        );
    }

    return (
        <Form data={data} onSubmit={onSubmit}>
            {({ data, form, Bind }) => (
                <SimpleForm size={"full"} data-testid={"pb-menus-form"}>
                    {loading && <OverlayLoader />}
                    <SimpleFormHeader title={data.title || t`New menu`} />
                    <SimpleFormContent>
                        <Grid>
                            <Grid.Column span={6}>
                                <Bind name="title" validators={validation.create("required")}>
                                    <Input
                                        label={t`Name`}
                                        data-testid="pb.menu.create.name"
                                        size={"lg"}
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={6}>
                                <Bind name="slug" validators={validation.create("required")}>
                                    <Input
                                        size={"lg"}
                                        disabled={Boolean(data.createdOn)}
                                        label={t`Slug`}
                                        data-testid="pb.menu.create.slug"
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind name="description">
                                    <Textarea
                                        size={"lg"}
                                        rows={5}
                                        label={t`Description`}
                                        data-testid="pb.menu.create.description"
                                    />
                                </Bind>
                            </Grid.Column>
                            <Bind name="items">
                                {props => (
                                    <MenuItems
                                        {...props}
                                        canSave={canWrite(loadedMenu?.createdBy?.id)}
                                    />
                                )}
                            </Bind>
                        </Grid>
                    </SimpleFormContent>
                    <SimpleFormFooter>
                        <Button
                            variant={"secondary"}
                            text={t`Cancel`}
                            onClick={() => history.push("/page-builder/menus")}
                            data-testid="pb.menu.new.form.button.cancel"
                        />
                        {canWrite(loadedMenu?.createdBy?.id) && (
                            <Button
                                text={t`Save`}
                                data-testid="pb.menu.save.button"
                                onClick={ev => {
                                    form.submit(ev);
                                }}
                            />
                        )}
                    </SimpleFormFooter>
                </SimpleForm>
            )}
        </Form>
    );
};

export default MenusForm;
