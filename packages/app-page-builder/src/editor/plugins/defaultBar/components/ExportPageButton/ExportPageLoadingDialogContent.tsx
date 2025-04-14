import React, { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useQuery } from "@apollo/react-hooks";
import {
    GET_PAGE_EXPORT_TASK,
    GetPageExportTaskResponse,
    GetPageExportTaskVariables
} from "~/admin/graphql/pageImportExport.gql";
import { i18n } from "@webiny/app/i18n";
import { Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as SuccessIcon } from "@webiny/icons/check_circle_outline.svg";
import { ReactComponent as ErrorIcon } from "@webiny/icons/error_outline.svg";
import { LoadingDialog } from "../ImportButton/styledComponents";
import ProgressBar from "../ImportButton/ProgressBar";
import useExportPageDialog from "./useExportPageDialog";
import { ImportExportTaskStatus, PbErrorResponse } from "~/types";
import { PbTaskStatus } from "~/admin/graphql/types";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/importPage");

const completionMessage = t`All pages have been exported`;
const errorMessage = t`Failed to import pages`;
const pendingMessage = t`Waiting for operation status`;
const processingMessage = t`Exporting pages`;
const abortedMessage = t`Importing pages aborted`;

const INTERVAL = 1000;

const MESSAGES: Record<PbTaskStatus, string> = {
    [PbTaskStatus.success]: completionMessage,
    [PbTaskStatus.running]: processingMessage,
    [PbTaskStatus.pending]: pendingMessage,
    [PbTaskStatus.failed]: errorMessage,
    [PbTaskStatus.aborted]: abortedMessage
};

interface ExportPageLoadingDialogContent {
    taskId: string;
}

const ExportPageLoadingDialogContent = ({ taskId }: ExportPageLoadingDialogContent) => {
    const [completed, setCompleted] = useState<boolean>(false);
    const [error, setError] = useState<PbErrorResponse | undefined | null>(null);
    const { showSnackbar } = useSnackbar();
    const { showExportPageContentDialog } = useExportPageDialog();

    const { data } = useQuery<GetPageExportTaskResponse, GetPageExportTaskVariables>(
        GET_PAGE_EXPORT_TASK,
        {
            variables: {
                id: taskId
            },
            skip: !taskId,
            fetchPolicy: "network-only",
            pollInterval: completed ? 0 : INTERVAL,
            notifyOnNetworkStatusChange: true
        }
    );

    const pollExportPageTaskStatus = useCallback((response: GetPageExportTaskResponse) => {
        const { error, data } = response.pageBuilder.getExportPagesTask;
        if (error) {
            showSnackbar(error.message);
            return;
        }

        // Handler failed task
        if (data && data.status === PbTaskStatus.failed) {
            setCompleted(true);
            showSnackbar("Error: Failed to export pages!");
            setError(data.data?.error);
        }

        if (data && data.status === PbTaskStatus.success) {
            setCompleted(true);

            if (!data.data?.url) {
                showSnackbar("Missing exported files URL! Please check task logs.");
                return;
            }
            showExportPageContentDialog({ exportUrl: data.data.url });
        }
    }, []);

    // This component will remain as long as we stick to `/page-builder/pages` route.
    useEffect(() => {
        if (!data) {
            return;
        }
        pollExportPageTaskStatus(data);
    }, [data]);

    const { status = ImportExportTaskStatus.PENDING, stats } =
        data?.pageBuilder.getExportPagesTask.data || {};

    return (
        <LoadingDialog.Wrapper>
            <LoadingDialog.WrapperLeft>
                <LoadingDialog.ExportIllustration />
            </LoadingDialog.WrapperLeft>
            <LoadingDialog.WrapperRight>
                {error ? (
                    <LoadingDialog.TitleContainer>
                        <Icon
                            icon={<ErrorIcon />}
                            label="Error"
                            size={"md"}
                            className={"wby-fill-danger wby-mr-sm"}
                        />
                        <Text size={"md"}>{errorMessage}</Text>
                    </LoadingDialog.TitleContainer>
                ) : status === PbTaskStatus.success ? (
                    <LoadingDialog.TitleContainer>
                        <Icon
                            icon={<SuccessIcon />}
                            label="Success"
                            size={"md"}
                            className={"wby-fill-success wby-mr-sm"}
                        />
                        <Text size={"md"}>{MESSAGES[status]}</Text>
                    </LoadingDialog.TitleContainer>
                ) : (
                    <LoadingDialog.TitleContainer>
                        <LoadingDialog.Pulse>
                            <div className="inner" />
                        </LoadingDialog.Pulse>
                        <Text size={"md"}>{MESSAGES[status]}</Text>
                    </LoadingDialog.TitleContainer>
                )}

                <LoadingDialog.StatsContainer>
                    {error && (
                        <LoadingDialog.StatusContainer>
                            <Text size={"md"}>{t`Error`}</Text>
                            <Text size={"sm"}> {error.message}</Text>
                        </LoadingDialog.StatusContainer>
                    )}
                    {stats && (
                        <LoadingDialog.ProgressContainer>
                            <Text size={"sm"}>
                                {t`{completed} of {total} completed`({
                                    completed: `${stats.completed}`,
                                    total: `${stats.total}`
                                })}
                            </Text>
                            <ProgressBar
                                value={stats.completed}
                                max={stats.total}
                                color={"var(--mdc-theme-secondary)"}
                                width={"100%"}
                            />
                        </LoadingDialog.ProgressContainer>
                    )}
                </LoadingDialog.StatsContainer>
            </LoadingDialog.WrapperRight>
        </LoadingDialog.Wrapper>
    );
};

export default ExportPageLoadingDialogContent;
