import React from "react";
import Revision from "./Revision";
import { FbFormModel, FbRevisionModel } from "~/types";
import { SimpleForm } from "@webiny/app-admin/components/SimpleForm";
import { List, OverlayLoader } from "@webiny/admin-ui";

interface RevisionsListProps {
    form: FbFormModel | null;
    revisions: FbRevisionModel[];
    loading: boolean;
}

export const RevisionsList = ({ form, revisions, loading }: RevisionsListProps) => {
    if (!form) {
        return null;
    }

    return (
        <div className={"wby-relative"}>
            {loading && <OverlayLoader text="Loading revisions..." />}
            <SimpleForm size={"full"} className={"wby-p-none"}>
                <List data-testid={"fb.form-details.tab.revisions.content-list"}>
                    {Array.isArray(revisions)
                        ? revisions.map(rev => <Revision form={form} revision={rev} key={rev.id} />)
                        : null}
                </List>
            </SimpleForm>
        </div>
    );
};
