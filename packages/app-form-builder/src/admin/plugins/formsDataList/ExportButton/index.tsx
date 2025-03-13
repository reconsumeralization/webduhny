import React from "react";
import { Tooltip } from "@webiny/ui/Tooltip";
import { i18n } from "@webiny/app/i18n";
import { DownloadIcon } from "@webiny/ui/List";
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
        <Tooltip content={renderExportFormsTooltip(selected)} placement={"bottom"}>
            <DownloadIcon
                data-testid={"export-form-button"}
                onClick={() => {
                    showExportFormRevisionSelectorDialog({
                        onAccept: () =>
                            showExportFormInitializeDialog({ ids: selected, ...restProps }),
                        selected
                    });
                }}
                size={"lg"}
            />
        </Tooltip>
    );
};
