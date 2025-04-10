import React from "react";
import { Button, OverlayLoader, IconButton, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { ReactComponent as TableIcon } from "@webiny/icons/table_chart.svg";
import { useRouter } from "@webiny/react-router";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { i18n } from "@webiny/app/i18n";

import { CreatableItem } from "./PageTemplates";
import { PbPageTemplate } from "~/types";
import { useListPageTemplates } from "~/features";
import { PageTemplateContentPreview } from "~/admin/views/PageTemplates/PageTemplateContentPreview";
import {
    SimpleForm,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";

const t = i18n.ns("app-page-builder/admin/views/page-templates/page-template-details");

interface EmptyTemplateDetailsProps {
    onCreate: () => void;
    canCreate: boolean;
}

const EmptyTemplateDetails = ({ onCreate, canCreate }: EmptyTemplateDetailsProps) => {
    return (
        <EmptyView
            icon={<TableIcon />}
            title={t`Click on the left side list to display template details {message} `({
                message: canCreate ? "or create a..." : ""
            })}
            action={
                canCreate ? (
                    <Button
                        text={t`New Template`}
                        icon={<AddIcon />}
                        data-testid="new-record-button"
                        onClick={onCreate}
                    />
                ) : (
                    <></>
                )
            }
        />
    );
};

type PageBuilderPageTemplateDetailsProps = {
    canCreate: boolean;
    canEdit: (item: CreatableItem) => boolean;
    canDelete: (item: CreatableItem) => boolean;
    onCreate: () => void;
    onDelete: (item: PbPageTemplate) => void;
};

export const PageTemplateDetails = ({
    canCreate,
    canEdit,
    canDelete,
    onCreate,
    onDelete
}: PageBuilderPageTemplateDetailsProps) => {
    const { history, location } = useRouter();
    const { pageTemplates, loading } = useListPageTemplates();

    const query = new URLSearchParams(location.search);
    const templateId = query.get("id");
    const template = pageTemplates.find(template => template.id === templateId);

    if (!templateId || !template) {
        return <EmptyTemplateDetails canCreate={canCreate} onCreate={onCreate} />;
    }

    return (
        <SimpleForm size={"lg"}>
            <div style={{ position: "relative" }} data-testid={"pb-page-templates-form"}>
                {loading && <OverlayLoader />}
                <SimpleFormHeader title={template.title} data-testid={"pb-categories-form-title"}>
                    <div className={"wby-flex wby-items-center wby-justify-end wby-gap-xs"}>
                        {canEdit(template) && (
                            <Tooltip
                                content={t`Edit template`}
                                trigger={
                                    <IconButton
                                        variant={"ghost"}
                                        icon={<EditIcon />}
                                        onClick={() =>
                                            history.push(
                                                `/page-builder/template-editor/${template.id}`
                                            )
                                        }
                                    />
                                }
                            />
                        )}
                        {canDelete(template) && (
                            <Tooltip
                                content={t`Delete template`}
                                trigger={
                                    <IconButton
                                        variant={"ghost"}
                                        icon={<DeleteIcon />}
                                        onClick={() => onDelete(template)}
                                    />
                                }
                            />
                        )}
                    </div>
                </SimpleFormHeader>
                <SimpleFormContent className={"wby-p-0 wby-border-b-sm"}>
                    <PageTemplateContentPreview template={template} />
                </SimpleFormContent>
            </div>
        </SimpleForm>
    );
};
