import React from "react";
import get from "lodash/get";
import { Text, Scrollbar } from "@webiny/admin-ui";
import { i18n } from "@webiny/app/i18n";
import { ShowDetails } from "../styledComponents";
import { ListBlockImportExportSubTasksResponse } from "~/admin/graphql/blockImportExport.gql";
import { PageBuilderImportExportSubTask } from "~/types";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/importBlock");

interface ImportBlocksDetailsProps {
    loading: boolean;
    result: ListBlockImportExportSubTasksResponse;
}

const ImportBlocksDetails = ({ loading, result }: ImportBlocksDetailsProps) => {
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
                    <ShowDetails.Label size={"sm"}>{t`Blocks imported:`}</ShowDetails.Label>
                    <ShowDetails.List data-testid={"import-blocks-dialog.show-detail-list"}>
                        {subtasks.map(subtask => {
                            const { block } = subtask.data;
                            return (
                                <ShowDetails.ListItem key={block.id}>
                                    <Text size={"sm"}>{block.name}</Text>
                                </ShowDetails.ListItem>
                            );
                        })}
                    </ShowDetails.List>
                </Scrollbar>
            </ShowDetails.Accordion>
        </ShowDetails.Container>
    );
};

export default ImportBlocksDetails;
