import React, { useCallback, useMemo } from "react";
import { Button, Grid, Input, OverlayLoader, Textarea } from "@webiny/admin-ui";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as TableIcon } from "@webiny/icons/table_chart.svg";
import { i18n } from "@webiny/app/i18n";
import { Form } from "@webiny/form";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import IconPicker from "./IconPicker";
import { validation } from "@webiny/validation";
import { blockCategorySlugValidator, blockCategoryDescriptionValidator } from "./validators";
import {
    GET_BLOCK_CATEGORY,
    CREATE_BLOCK_CATEGORY,
    UPDATE_BLOCK_CATEGORY,
    LIST_BLOCK_CATEGORIES,
    GetBlockCategoryQueryResponse,
    GetBlockCategoryQueryVariables,
    UpdateBlockCategoryMutationResponse,
    UpdateBlockCategoryMutationVariables,
    CreateBlockCategoryMutationResponse,
    CreateBlockCategoryMutationVariables
} from "./graphql";
import { useRouter } from "@webiny/react-router";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { PbBlockCategory } from "~/types";
import pick from "lodash/pick";
import get from "lodash/get";
import set from "lodash/set";
import isEmpty from "lodash/isEmpty";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { usePagesPermissions } from "~/hooks/permissions";

const t = i18n.ns("app-page-builder/admin/block-categories/form");

interface CategoriesFormProps {
    canCreate: boolean;
}

const CategoriesForm = ({ canCreate }: CategoriesFormProps) => {
    const { location, history } = useRouter();
    const { showSnackbar } = useSnackbar();

    const newEntry = new URLSearchParams(location.search).get("new") === "true";
    const slug = new URLSearchParams(location.search).get("slug");

    const getQuery = useQuery<GetBlockCategoryQueryResponse, GetBlockCategoryQueryVariables>(
        GET_BLOCK_CATEGORY,
        {
            variables: {
                slug: slug as string
            },
            skip: !slug,
            onCompleted: data => {
                const error = data?.pageBuilder?.getBlockCategory?.error;
                if (error) {
                    history.push("/page-builder/block-categories");
                    showSnackbar(error.message);
                }
            }
        }
    );

    const loadedBlockCategory = getQuery.data?.pageBuilder?.getBlockCategory?.data || {
        slug: null,
        createdBy: {
            id: null
        }
    };

    const [create, createMutation] = useMutation<
        CreateBlockCategoryMutationResponse,
        CreateBlockCategoryMutationVariables
    >(CREATE_BLOCK_CATEGORY, {
        refetchQueries: [{ query: LIST_BLOCK_CATEGORIES }]
    });

    const [update, updateMutation] = useMutation<
        UpdateBlockCategoryMutationResponse,
        UpdateBlockCategoryMutationVariables
    >(UPDATE_BLOCK_CATEGORY, {
        refetchQueries: [{ query: LIST_BLOCK_CATEGORIES }],
        update: (cache, { data }) => {
            const blockCategoryDataFromCache = cache.readQuery<GetBlockCategoryQueryResponse>({
                query: GET_BLOCK_CATEGORY,
                variables: { slug }
            }) as GetBlockCategoryQueryResponse;
            const updatedBlockCategoryData = get(data, "pageBuilder.blockCategory.data");

            if (updatedBlockCategoryData) {
                cache.writeQuery<GetBlockCategoryQueryResponse, GetBlockCategoryQueryVariables>({
                    query: GET_BLOCK_CATEGORY,
                    data: set(
                        blockCategoryDataFromCache,
                        "pageBuilder.getBlockCategory.data",
                        updatedBlockCategoryData
                    )
                });
            }
        }
    });

    const loading = [getQuery, createMutation, updateMutation].find(item => item.loading);

    const onSubmit = useCallback(
        async (formData: PbBlockCategory) => {
            const isUpdate = loadedBlockCategory.slug;
            const data = pick(formData, ["slug", "name", "icon", "description"]);

            let response;
            if (isUpdate) {
                response = await update({
                    variables: { slug: formData.slug, data }
                });
            } else {
                response = await create({
                    variables: {
                        data
                    }
                });
            }

            const error = response?.data?.pageBuilder?.blockCategory?.error;
            if (error) {
                showSnackbar(error.message);
                return;
            }

            if (!isUpdate) {
                history.push(`/page-builder/block-categories?slug=${formData.slug}`);
            }

            showSnackbar(t`Block Category saved successfully.`);
        },
        [loadedBlockCategory.slug]
    );

    const data = useMemo((): PbBlockCategory => {
        return getQuery.data?.pageBuilder?.getBlockCategory.data || ({} as PbBlockCategory);
    }, [loadedBlockCategory.slug]);

    const { canWrite } = usePagesPermissions();

    const canSave = useMemo(
        () => canWrite(loadedBlockCategory.createdBy.id),
        [loadedBlockCategory]
    );

    const showEmptyView = !newEntry && !loading && isEmpty(data);
    // Render "No content selected" view.
    if (showEmptyView) {
        return (
            <EmptyView
                icon={<TableIcon />}
                title={t`Click on the left side list to display block category details {message}`({
                    message: canCreate ? "or create a..." : ""
                })}
                action={
                    canCreate ? (
                        <Button
                            text={t`New Category`}
                            icon={<AddIcon />}
                            data-testid="new-record-button"
                            onClick={() => history.push("/page-builder/block-categories?new=true")}
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
                <SimpleForm>
                    {loading && <OverlayLoader />}
                    <SimpleFormHeader title={data.name || t`New block category`} />
                    <SimpleFormContent>
                        <Grid>
                            <Grid.Column span={6}>
                                <Bind name="name" validators={validation.create("required")}>
                                    <Input size={"lg"} label={t`Name`} />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={6}>
                                <Bind
                                    name="slug"
                                    validators={[
                                        validation.create("required"),
                                        blockCategorySlugValidator
                                    ]}
                                >
                                    <Input
                                        size={"lg"}
                                        disabled={Boolean(data.createdOn)}
                                        label={t`Slug`}
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind
                                    name="icon"
                                    validators={validation.create("required")}
                                    defaultValue={"fas/star"}
                                >
                                    <IconPicker
                                        label={t`Category icon`}
                                        description={t`Icon that will be displayed in the page builder.`}
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind
                                    name="description"
                                    validators={[
                                        validation.create("required"),
                                        blockCategoryDescriptionValidator
                                    ]}
                                >
                                    <Textarea size={"lg"} label={t`Description`} />
                                </Bind>
                            </Grid.Column>
                        </Grid>
                    </SimpleFormContent>
                    <SimpleFormFooter>
                        <Button
                            variant={"secondary"}
                            text={t`Cancel`}
                            onClick={() => history.push("/page-builder/block-categories")}
                        />
                        {canSave && (
                            <Button
                                text={t`Save`}
                                data-testid={"pb-block-categories-form-save-block-category-btn"}
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

export default CategoriesForm;
