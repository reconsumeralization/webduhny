import React, { useCallback, useMemo, useState } from "react";
import { Button, CheckboxPrimitive, Grid, Select, TimeAgo } from "@webiny/admin-ui";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { i18n } from "@webiny/app/i18n";
import { useRouter } from "@webiny/react-router";
import orderBy from "lodash/orderBy";
import {
    DataList,
    DataListModalOverlay,
    DataListModalOverlayAction,
    DeleteIcon,
    EditIcon,
    ListActions,
    ListItem,
    ListItemMeta,
    ListItemText,
    ListItemTextPrimary,
    ListItemTextSecondary,
    ListSelectBox,
    ScrollList,
    UploadIcon
} from "@webiny/ui/List";
import SearchUI from "@webiny/app-admin/components/SearchUI";
import { CreatableItem } from "./PageTemplates";
import { useMultiSelect } from "~/admin/views/Pages/hooks/useMultiSelect";
import { ExportTemplatesButton } from "~/editor/plugins/defaultBar/components/ExportTemplateButton";
import useImportTemplate from "~/admin/views/PageTemplates/hooks/useImportTemplate";
import { OptionsMenu } from "~/admin/components/OptionsMenu";
import { PbPageTemplate } from "~/types";
import { useListPageTemplates } from "~/features";

const t = i18n.ns("app-page-builder/admin/views/page-templates/page-templates-details");

interface Sorter {
    label: string;
    sort: string;
}

const SORTERS: Sorter[] = [
    {
        label: t`Newest to oldest`,
        sort: "createdOn_DESC"
    },
    {
        label: t`Oldest to newest`,
        sort: "createdOn_ASC"
    },
    {
        label: t`Title A-Z`,
        sort: "title_ASC"
    },
    {
        label: t`Title Z-A`,
        sort: "title_DESC"
    }
];

type PageTemplatesDataListProps = {
    canCreate: boolean;
    canEdit: (item: CreatableItem) => boolean;
    canDelete: (item: CreatableItem) => boolean;
    onCreate: () => void;
    onDelete: (item: PbPageTemplate) => void;
};

const PageTemplatesDataList = ({
    canCreate,
    canEdit,
    canDelete,
    onCreate,
    onDelete
}: PageTemplatesDataListProps) => {
    const [filter, setFilter] = useState<string>("");
    const [sort, setSort] = useState<string>(SORTERS[0].sort);
    const { history } = useRouter();
    const { loading, pageTemplates } = useListPageTemplates();
    const query = new URLSearchParams(location.search);
    const search = {
        query: query.get("search") || undefined
    };

    const filterData = useCallback(
        ({ title }: PbPageTemplate) => {
            return title.toLowerCase().includes(filter);
        },
        [filter]
    );

    const sortData = useCallback(
        (templates: PbPageTemplate[]) => {
            if (!sort) {
                return templates;
            }
            const [field, order] = sort.split("_");
            return orderBy(templates, field, order.toLowerCase() as "asc" | "desc");
        },
        [sort]
    );

    const selectedTemplate = new URLSearchParams(location.search).get("id");

    const templatesDataListModalOverlay = useMemo(
        () => (
            <DataListModalOverlay>
                <Grid>
                    <Grid.Column span={12}>
                        <Select
                            value={sort}
                            onChange={setSort}
                            label={t`Sort by`}
                            options={SORTERS.map(({ label, sort: value }) => ({
                                label,
                                value
                            }))}
                        />
                    </Grid.Column>
                </Grid>
            </DataListModalOverlay>
        ),
        [sort]
    );

    const { showImportDialog } = useImportTemplate();

    const listActions = useMemo(() => {
        if (!canCreate) {
            return null;
        }
        return (
            <>
                <Button
                    text={t`New`}
                    icon={<AddIcon />}
                    size={"sm"}
                    className={"wby-ml-xs"}
                    data-testid="data-list-new-record-button"
                    onClick={onCreate}
                />
                <OptionsMenu
                    data-testid={"pb-templates-list-options-btn"}
                    items={[
                        {
                            label: "Import templates",
                            icon: <UploadIcon />,
                            onClick: showImportDialog,
                            "data-testid": "pb-templates-list-options-import-template-btn"
                        }
                    ]}
                />
            </>
        );
    }, [canCreate, showImportDialog]);

    const filteredTemplatesData: PbPageTemplate[] =
        filter === "" ? pageTemplates : pageTemplates.filter(filterData);
    const templatesList: PbPageTemplate[] = sortData(filteredTemplatesData);

    const multiSelectProps = useMultiSelect({
        useRouter: false,
        getValue: (item: any) => item.id
    });

    return (
        <DataList
            title={t`Templates`}
            loading={Boolean(loading)}
            data={templatesList}
            actions={listActions}
            modalOverlay={templatesDataListModalOverlay}
            modalOverlayAction={
                <DataListModalOverlayAction data-testid={"default-data-list.filter"} />
            }
            multiSelectActions={
                <ExportTemplatesButton
                    getMultiSelected={multiSelectProps.getMultiSelected}
                    sort={sort}
                    search={{
                        query: search ? search.query || "" : ""
                    }}
                />
            }
            multiSelectAll={multiSelectProps.multiSelectAll}
            isAllMultiSelected={multiSelectProps.isAllMultiSelected}
            isNoneMultiSelected={multiSelectProps.isNoneMultiSelected}
            search={
                <SearchUI
                    value={filter}
                    onChange={setFilter}
                    inputPlaceholder={t`Search templates...`}
                    dataTestId={"pb.template.data-list.search-input"}
                />
            }
        >
            {({ data }: { data: PbPageTemplate[] }) => (
                <>
                    <ScrollList data-testid="default-data-list">
                        {data.map(template => {
                            return (
                                <ListItem
                                    key={template.id}
                                    selected={template.id === selectedTemplate}
                                >
                                    <ListSelectBox>
                                        <CheckboxPrimitive
                                            onChange={() => multiSelectProps.multiSelect(template)}
                                            checked={multiSelectProps.isMultiSelected(template)}
                                        />
                                    </ListSelectBox>
                                    <ListItemText
                                        onClick={() =>
                                            history.push(
                                                `/page-builder/page-templates?id=${template.id}`
                                            )
                                        }
                                    >
                                        <ListItemTextPrimary>{template.title}</ListItemTextPrimary>
                                        <ListItemTextSecondary>
                                            <div>{template.description}</div>
                                            {template.createdBy && (
                                                <div>
                                                    {`Created by:
                                                ${template.createdBy.displayName || "N/A"}. `}
                                                    {`Last modified: `}
                                                    <TimeAgo datetime={template.savedOn} />.
                                                </div>
                                            )}
                                        </ListItemTextSecondary>
                                    </ListItemText>
                                    <ListItemMeta>
                                        <ListActions>
                                            {canEdit(template) && (
                                                <EditIcon
                                                    data-testid={
                                                        "pb-templates-list-edit-template-btn"
                                                    }
                                                    onClick={() =>
                                                        history.push(
                                                            `/page-builder/template-editor/${template.id}`
                                                        )
                                                    }
                                                />
                                            )}
                                            {canDelete(template) && (
                                                <DeleteIcon
                                                    data-testid={
                                                        "pb-templates-list-delete-template-btn"
                                                    }
                                                    onClick={() => onDelete(template)}
                                                />
                                            )}
                                        </ListActions>
                                    </ListItemMeta>
                                </ListItem>
                            );
                        })}
                    </ScrollList>
                </>
            )}
        </DataList>
    );
};

export default PageTemplatesDataList;
