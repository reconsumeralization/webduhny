import React from "react";
import { i18n } from "@webiny/app/i18n";
import { IconButton, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as DownloadIcon } from "@webiny/icons/file_download.svg";
import useExportFormDialog, { ExportFormsDialogProps } from "./useExportFormDialog";
import useExportFormRevisionSelectorDialog from "./useExportFormRevisionSelectorDialog";

const t = i18n.ns("app-form-builder/admin/plugins/editor/defaultBar/exportFormButton");

interface ExportFormsButtonProps extends ExportFormsDialogProps {
    getMultiSelected: any;
}

export const ExportFormsButton = ({ getMultiSelected, ...restProps }: ExportFormsButtonProps) => {
    const selected = getMultiSelected();
    const { showExportFormRevisionSelectorDialog } = useExportFormRevisionSelectorDialog();
    const { showExportFormInitializeDialog } = useExportFormDialog();

    const renderExportFormsTooltip = (selected: string[]) => {
        const count = selected.length;
        if (count > 0) {
            return t`Export {count|count:1:form:default:forms}.`({
                count
            });
        }

        return t`Export all forms`;
    };

    return (
        <Tooltip
            trigger={
                <IconButton
                    icon={<DownloadIcon />}
                    size={"sm"}
                    variant={"ghost"}
                    data-testid={"export-template-button"}
                    onClick={() =>
                        showExportFormRevisionSelectorDialog({
                            onAccept: () =>
                                showExportFormInitializeDialog({ ids: selected, ...restProps }),
                            selected
                        })
                    }
                />
            }
            content={renderExportFormsTooltip(selected)}
        />
    );
};
