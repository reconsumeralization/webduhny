import React, { useEffect, useState } from "react";
import FormPreview from "./FormPreview";
import Header from "./Header";
import { i18n } from "@webiny/app/i18n";
import { FbFormDetailsPluginRenderParams, FbFormDetailsPluginType } from "~/types";
import { OverlayLoader, Tabs } from "@webiny/admin-ui";
import { ReactComponent as FullscreenIcon } from "@webiny/icons/fullscreen.svg";
import {
    SimpleForm,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";

const t = i18n.namespace("FormsApp.FormDetails.PreviewContent");

const PreviewContentTab = (props: FbFormDetailsPluginRenderParams) => {
    const [revisionId, setRevisionId] = useState<string>();

    useEffect((): void => {
        if (!props.revisions.length) {
            return;
        }
        setRevisionId(props.form.id);
    }, [props.form.id, props.revisions.length]);

    const revision = props.revisions.find(item => item.id === revisionId);
    if (!revision) {
        return null;
    }

    return (
        <SimpleForm size={"full"} className={"wby-p-none "}>
            <SimpleFormHeader title={revision.name}>
                <Header
                    {...props}
                    revision={revision}
                    selectRevision={revision => setRevisionId(revision.id)}
                />
            </SimpleFormHeader>
            <SimpleFormContent
                className={"wby-p-0 wby-border-b-sm wby-rounded-b-3xl wby-overflow-hidden"}
            >
                {props.loading && (
                    <div className={"wby-relative wby-w-full"}>
                        <OverlayLoader text={"Loading preview..."} />
                    </div>
                )}
                <FormPreview revision={revision} form={props.form} />
            </SimpleFormContent>
        </SimpleForm>
    );
};

export default [
    {
        name: "forms-form-details-revision-content-preview",
        type: "forms-form-details-revision-content",
        render(props) {
            return (
                <Tabs.Tab
                    value={"preview"}
                    trigger={t`Preview`}
                    icon={<FullscreenIcon />}
                    content={<PreviewContentTab {...props} />}
                    disabled={props.loading}
                    data-testid={"fb.form-details.tab.form-preview"}
                />
            );
        }
    }
] as FbFormDetailsPluginType[];
