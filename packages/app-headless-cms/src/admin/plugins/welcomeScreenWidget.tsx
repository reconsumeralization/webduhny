import React from "react";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as CmsIcon } from "@webiny/icons/wysiwyg.svg";

import { AdminWelcomeScreenWidgetPlugin } from "@webiny/app-plugin-admin-welcome-screen/types";

import { Button, Link } from "@webiny/admin-ui";

const plugin: AdminWelcomeScreenWidgetPlugin = {
    type: "admin-welcome-screen-widget",
    name: "admin-welcome-screen-widget-headless-cms",
    permission: "cms.endpoint.manage",
    widget: {
        cta: (
            <Button
                text={<Link to="/cms/content-models">{"New Content Model"}</Link>}
                icon={<AddIcon />}
                asChild
            />
        ),
        description: "GraphQL based headless CMS with powerful content modeling features.",
        title: "CMS",
        icon: <CmsIcon />
    }
};

export default plugin;
