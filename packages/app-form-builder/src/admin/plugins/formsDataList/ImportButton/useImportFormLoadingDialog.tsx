import React, { useCallback, useEffect, useState } from "react";
import get from "lodash/get";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { i18n } from "@webiny/app/i18n";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { ReactComponent as SuccessIcon } from "@webiny/icons/check_circle_outline.svg";
import { ReactComponent as ErrorIcon } from "@webiny/icons/error_outline.svg";
import ImportFormsDetails from "./useImportFormsDetails";
import ProgressBar from "./ProgressBar";
import { LoadingDialog } from "./styledComponents";
import { GET_FORM_IMPORT_EXPORT_TASK, LIST_FORM_IMPORT_EXPORT_SUB_TASKS } from "~/admin/graphql";
import { ImportExportTaskStatus } from "~/types";
import { Icon, Text } from "@webiny/admin-ui";

const t = i18n.ns("app-form-builder/admin/plugins/editor/defaultBar/importForm");

const importFormDialogTitle = t`Import forms`;

const completionMessage = t`All forms have been imported`;
const errorMessage = t`Failed to import forms`;
const pendingMessage = t`Waiting for operation status`;
const processingMessage = t`Importing forms`;

const INTERVAL = 0.5 * 1000;

const MESSAGES: Record<string, string> = {
    [ImportExportTaskStatus.COMPLETED]: completionMessage,
    [ImportExportTaskStatus.PROCESSING]: processingMessage,
    [ImportExportTaskStatus.PENDING]: pendingMessage
};

interface ImportFormLoadingDialogContentProps {
    taskId: string;
}

interface FormImportExportData {
    [key: string]: any;
}

const ImportFormLoadingDialogContent = ({ taskId }: ImportFormLoadingDialogContentProps) => {
    const { showSnackbar } = useSnackbar();
    const [completed, setCompleted] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const { data } = useQuery(GET_FORM_IMPORT_EXPORT_TASK, {
        variables: {
            id: taskId
        },
        skip: taskId === null,
        fetchPolicy: "network-only",
        pollInterval: completed ? 0 : INTERVAL,
        notifyOnNetworkStatusChange: true
    });

    const [getSubTasks, getSubTasksQuery] = useLazyQuery(LIST_FORM_IMPORT_EXPORT_SUB_TASKS, {
        variables: {
            id: taskId,
            status: "completed"
        }
    });

    const pollExportFormTaskStatus = useCallback((response: FormImportExportData) => {
        const { error, data } = get(response, "pageBuilder.getImportExportTask", {});
        if (error) {
            return showSnackbar(error.message);
        }

        // Handler failed task
        if (data && data.status === "failed") {
            setCompleted(true);
            showSnackbar("Error: Failed to import forms");
            // TODO: @ashutosh show an informative dialog about error.
            setError(data.error);
        }

        if (data && data.status === "completed") {
            setCompleted(true);
            getSubTasks();
        }
    }, []);

    // This component will remain as long as we stick to `/form-builder/forms` route.
    useEffect(() => {
        if (!data) {
            return;
        }
        pollExportFormTaskStatus(data);
    }, [data]);

    const { status, stats } = get(data, "pageBuilder.getImportExportTask.data", {
        status: "pending",
        stats: null
    });

    return (
        <LoadingDialog.Wrapper>
            <LoadingDialog.WrapperLeft>
                <LoadingDialog.UploadIllustration />
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
                ) : status === "completed" ? (
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
                <ImportFormsDetails
                    loading={getSubTasksQuery.loading}
                    result={getSubTasksQuery.data}
                />
            </LoadingDialog.WrapperRight>
        </LoadingDialog.Wrapper>
    );
};

interface UseImportFormLoadingDialogCallableResponse {
    showImportFormLoadingDialog: (props: ImportFormLoadingDialogContentProps) => void;
}
const useImportFormLoadingDialog = (): UseImportFormLoadingDialogCallableResponse => {
    const { showDialog } = useDialog();

    return {
        showImportFormLoadingDialog: props => {
            showDialog(<ImportFormLoadingDialogContent {...props} />, {
                title: importFormDialogTitle,
                actions: {
                    accept: { label: t`Continue`, onClick: () => window.location.reload() }
                },
                dataTestId: "import-forms.loading-dialog"
            });
        }
    };
};

export default useImportFormLoadingDialog;
