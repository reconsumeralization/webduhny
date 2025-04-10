import React from "react";
import { FbFormDetailsPluginType } from "~/types";
import { Tabs } from "@webiny/admin-ui";
import { ReactComponent as RestoreIcon } from "@webiny/icons/restore.svg";
import { RevisionsList } from "./RevisionsList";

const plugin: FbFormDetailsPluginType = {
    name: "forms-form-details-revision-content-revisions",
    type: "forms-form-details-revision-content",
    render({ form, revisions, loading }) {
        return (
            <Tabs.Tab
                value={"revisions"}
                trigger={"Revisions"}
                icon={<RestoreIcon />}
                content={<RevisionsList form={form} revisions={revisions} loading={loading} />}
                disabled={loading}
                data-testid={"fb.form-details.tab.revisions"}
            />
        );
    }
};

export default plugin;
