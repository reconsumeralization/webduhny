import React from "react";
import { Text, Scrollbar } from "@webiny/admin-ui";
import { i18n } from "@webiny/app/i18n";
import { Link } from "@webiny/react-router";
import { ShowDetails } from "../styledComponents";
import { ListImportedPagesResponse } from "~/admin/graphql/pageImportExport.gql";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/importPage");

interface ImportPagesDetailsProps {
    loading: boolean;
    result?: ListImportedPagesResponse;
}

const ImportPagesDetails = ({ loading, result }: ImportPagesDetailsProps) => {
    if (loading || !result) {
        return <Text size={"sm"}>{t`Loading details...`}</Text>;
    }

    const { data: pages, error } = result.pageBuilder.listImportedPages;
    if (error) {
        return <ShowDetails.Container>{error.message}</ShowDetails.Container>;
    } else if (!pages?.length) {
        return (
            <ShowDetails.Container>
                {t`Something is wrong, cannot find imported pages.`}
            </ShowDetails.Container>
        );
    }
    return (
        <ShowDetails.Container>
            <ShowDetails.Accordion title={"Show details"}>
                <Scrollbar
                    style={{
                        height: 160
                    }}
                >
                    <ShowDetails.Label size={"sm"}>{t`Pages imported:`}</ShowDetails.Label>
                    <ShowDetails.List data-testid={"import-pages-dialog.show-detail-list"}>
                        {pages.map(page => {
                            return (
                                <ShowDetails.ListItem key={page.id}>
                                    <Text size={"sm"}>{`${page.title} (v${page.version})`}</Text>
                                    <Link
                                        to={`/page-builder/editor/${encodeURIComponent(page.id)}`}
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

export default ImportPagesDetails;
