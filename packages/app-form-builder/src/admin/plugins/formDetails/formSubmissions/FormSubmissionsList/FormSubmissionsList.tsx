import React, { useState } from "react";
import { TimeAgo } from "@webiny/ui/TimeAgo";
import { css } from "emotion";
import styled from "@emotion/styled";
import { i18n } from "@webiny/app/i18n";
import * as ListComponents from "@webiny/ui/List";
import { Tooltip } from "@webiny/ui/Tooltip";
import { Typography } from "@webiny/ui/Typography";
import { Scrollbar } from "@webiny/ui/Scrollbar";
import FormSubmissionDialog from "./FormSubmissionDialog";
import Block from "../Block";
import { useSubmissions } from "./useSubmissions";
import { FbFormSubmissionData } from "~/types";
import { DownloadIcon } from "@webiny/ui/List";

const t = i18n.namespace("FormsApp.FormsDataList");

const TOP = 490;
const blockWrapper = css({
    "& .webiny-data-list__content": {
        height: `calc(100vh - ${TOP}px)`
    }
});

const InlineLoaderWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: var(--mdc-theme-surface);
`;

interface FullNameProps {
    submission: FbFormSubmissionData;
}
const FullName = ({ submission }: FullNameProps) => {
    const {
        data: { firstName, lastName, email }
    } = submission;

    const output = [firstName, lastName, email && `<${email}>`].filter(Boolean).join(" ");
    return <span>{output || "N/A"}</span>;
};

interface FormVersionProps {
    submission: FbFormSubmissionData;
}
const FormVersion = ({ submission }: FormVersionProps) => {
    return <span>Form revision #{submission.form.version}</span>;
};

interface FormSubmissionsListProps {
    form: {
        id: string;
    };
}

const { DataList, ListItem, ListItemText, ListItemTextPrimary, ListItemTextSecondary } =
    ListComponents;

export const FormSubmissionsList = ({ form }: FormSubmissionsListProps) => {
    const {
        loading,
        fetchMoreLoading,
        refresh,
        loadMoreOnScroll,
        submissions,
        setSorter,
        exportSubmissions,
        exportInProgress
    } = useSubmissions(form);

    const [selectedFormSubmission, selectFormSubmission] = useState<FbFormSubmissionData | null>(
        null
    );

    return (
        <>
            <Block title="Submissions" className={blockWrapper}>
                <DataList
                    loading={loading}
                    refresh={refresh}
                    data={submissions}
                    setSorters={setSorter}
                    multiSelectAll={undefined}
                    multiSelectActions={
                        <Tooltip content={t`Export all form submissions`} placement={"bottom"}>
                            <DownloadIcon
                                onClick={exportSubmissions}
                                disabled={exportInProgress}
                                size={"md"}
                            />
                        </Tooltip>
                    }
                    // sorters={sorters}
                    showOptions={{
                        multiSelectAll: false,
                        sorters: true,
                        refresh: true,
                        pagination: true
                    }}
                >
                    {({ data }: { data: FbFormSubmissionData[] }) => (
                        <>
                            <Scrollbar onScrollFrame={scrollFrame => loadMoreOnScroll(scrollFrame)}>
                                {(data || []).map(submission => {
                                    const submittedOn = submission.meta
                                        ? new Date(submission.meta.submittedOn)
                                        : new Date();

                                    return (
                                        <ListItem key={submission.id}>
                                            <ListItemText
                                                onClick={() => selectFormSubmission(submission)}
                                            >
                                                <ListItemTextPrimary>
                                                    <FullName submission={submission} />
                                                </ListItemTextPrimary>
                                                <ListItemTextSecondary>
                                                    <div>
                                                        Visitor IP:{" "}
                                                        {(submission.meta && submission.meta.ip) ||
                                                            "N/A"}
                                                    </div>
                                                    <div>
                                                        {t`Submitted: {time}.`({
                                                            time: <TimeAgo datetime={submittedOn} />
                                                        })}
                                                    </div>
                                                    <div>
                                                        <FormVersion submission={submission} />
                                                    </div>
                                                </ListItemTextSecondary>
                                            </ListItemText>
                                        </ListItem>
                                    );
                                })}
                            </Scrollbar>
                            {fetchMoreLoading && (
                                <InlineLoaderWrapper>
                                    <Typography
                                        use={"overline"}
                                    >{t`Loading more form submissions...`}</Typography>
                                </InlineLoaderWrapper>
                            )}
                        </>
                    )}
                </DataList>
            </Block>
            <FormSubmissionDialog
                onClose={() => {
                    selectFormSubmission(null);
                }}
                formSubmission={selectedFormSubmission}
            />
        </>
    );
};
