import React from "react";
import get from "lodash/get";
import { Text, Scrollbar } from "@webiny/admin-ui";
import { i18n } from "@webiny/app/i18n";
import { Link } from "@webiny/react-router";
import { ShowDetails } from "../styledComponents";
import { ListTemplateImportExportSubTasksResponse } from "~/admin/graphql/templateImportExport.gql";
import { PageBuilderImportExportSubTask } from "~/types";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/importTemplate");

interface ImportTemplatesDetailsProps {
    loading: boolean;
    result: ListTemplateImportExportSubTasksResponse;
}

const ImportTemplatesDetails = ({ loading, result }: ImportTemplatesDetailsProps) => {
    if (loading || !result) {
        return <Text size={"sm"}>{t`Loading details...`}</Text>;
    }
    const subtasks: PageBuilderImportExportSubTask[] = get(
        result,
        "pageBuilder.listImportExportSubTask.data",
        []
    );
    return (
        <ShowDetails.Container>
            <ShowDetails.Accordion title={"Show details"}>
                <Scrollbar
                    style={{
                        height: 160
                    }}
                >
                    <ShowDetails.Label size={"sm"}>{t`Templates imported:`}</ShowDetails.Label>
                    <ShowDetails.List data-testid={"import-templates-dialog.show-detail-list"}>
                        {subtasks.map(subtask => {
                            const { template } = subtask.data;
                            return (
                                <ShowDetails.ListItem key={template.id}>
                                    <Text size={"sm"}>{template.title}</Text>
                                    <Link
                                        to={`/page-builder/page-templates?id=${encodeURIComponent(
                                            template.id
                                        )}`}
                                        target={"_blank"}
                                    >
                                        <Text size={"sm"}>{t`view`}</Text>
                                    </Link>
                                </ShowDetails.ListItem>
                            );
                        })}
                    </ShowDetails.List>
                </Scrollbar>
            </ShowDetails.Accordion>
        </ShowDetails.Container>
    );
};

export default ImportTemplatesDetails;
