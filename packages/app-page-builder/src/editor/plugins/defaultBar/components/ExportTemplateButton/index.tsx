import React from "react";
import { i18n } from "@webiny/app/i18n";
import useExportTemplateDialog, { ExportTemplatesDialogProps } from "./useExportTemplateDialog";
import { ReactComponent as DownloadIcon } from "@webiny/icons/file_download.svg";
import { IconButton, Tooltip } from "@webiny/admin-ui";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/exportTemplateButton");

interface ExportTemplatesButtonProps extends ExportTemplatesDialogProps {
    getMultiSelected: any;
}

export const ExportTemplatesButton = ({
    getMultiSelected,
    ...restProps
}: ExportTemplatesButtonProps) => {
    const selected = getMultiSelected();
    const { showExportTemplateInitializeDialog } = useExportTemplateDialog();

    const renderExportTemplatesTooltip = (selected: string[]) => {
        const count = selected.length;
        if (count > 0) {
            return t`Export {count|count:1:template:default:templates}.`({
                count
            });
        }

        return t`Export all templates`;
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
                        showExportTemplateInitializeDialog({ ids: selected, ...restProps })
                    }
                />
            }
            content={renderExportTemplatesTooltip(selected)}
        />
    );
};
