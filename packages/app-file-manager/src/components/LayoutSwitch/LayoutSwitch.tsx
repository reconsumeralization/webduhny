import React from "react";
import { IconButton, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as GridIcon } from "@webiny/icons/view_module.svg";
import { ReactComponent as TableIcon } from "@webiny/icons/view_list.svg";
import { i18n } from "@webiny/app/i18n";

import { useFileManagerView } from "~/modules/FileManagerRenderer/FileManagerViewProvider";

const t = i18n.ns("app-file-manager/components/layout-switch");

export const LayoutSwitch = () => {
    const view = useFileManagerView();

    return (
        <Tooltip
            side={"bottom"}
            trigger={
                <IconButton
                    icon={view.listTable ? <GridIcon /> : <TableIcon />}
                    onClick={() => view.setListTable(!view.listTable)}
                />
            }
            content={t`{mode} layout`({
                mode: view.listTable ? "Grid" : "Table"
            })}
        />
    );
};
