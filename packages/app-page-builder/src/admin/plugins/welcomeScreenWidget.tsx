import React from "react";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as PbPageIcon } from "@webiny/icons/table_chart.svg";
import { Button, Link } from "@webiny/admin-ui";

import { AdminWelcomeScreenWidgetPlugin } from "@webiny/app-plugin-admin-welcome-screen/types";

const plugin: AdminWelcomeScreenWidgetPlugin = {
    type: "admin-welcome-screen-widget",
    name: "admin-welcome-screen-widget-page-builder",
    permission: "pb.page",
    widget: {
        cta: (
            <Button
                text={<Link to="/page-builder/pages">{"Build a new Page"}</Link>}
                icon={<AddIcon />}
                asChild
            />
        ),
        description: "Build stunning landing pages with an easy to use drag and drop editor.",
        title: "Pages",
        icon: <PbPageIcon />
    }
};

export default plugin;
