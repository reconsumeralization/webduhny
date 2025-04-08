import * as React from "react";
import { renderPlugins } from "@webiny/app/plugins";
import { FbFormDetailsPluginType, FbFormDetailsSubmissionsPlugin } from "../../../../types";
import { i18n } from "@webiny/app/i18n";
import { FormSubmissionsOverview } from "./FormSubmissionsOverview";
import { FormSubmissionsList } from "./FormSubmissionsList";
import { OverlayLoader, Tabs } from "@webiny/admin-ui";
import { ReactComponent as GradingIcon } from "@webiny/icons/grading.svg";
import { SimpleForm } from "@webiny/app-admin/components/SimpleForm";

const t = i18n.namespace("FormsApp.FormDetails.PreviewContent");

export default [
    {
        name: "forms-form-details-revision-content-submissions",
        type: "forms-form-details-revision-content",
        render({ form, loading, security }) {
            const { getPermissions } = security;

            const fbFormPermissions = getPermissions("fb.form");
            if (!fbFormPermissions.length) {
                return null;
            }

            let hasAccessToSubmissions = false;
            for (let i = 0; i < fbFormPermissions.length; i++) {
                const { submissions } = fbFormPermissions[i];
                if (typeof submissions == "undefined" || submissions === true) {
                    hasAccessToSubmissions = true;
                    break;
                }
            }

            if (!hasAccessToSubmissions) {
                return null;
            }

            return (
                <Tabs.Tab
                    value={"submissions"}
                    trigger={t`Submissions`}
                    icon={<GradingIcon />}
                    content={
                        <div className={"wby-relative"}>
                            {loading && <OverlayLoader />}
                            <SimpleForm size={"full"} className={"wby-p-none"}>
                                {form &&
                                    renderPlugins("forms-form-details-submissions", {
                                        form
                                    })}
                            </SimpleForm>
                        </div>
                    }
                    disabled={loading}
                    data-testid={"fb.form-details.tab.submissions"}
                />
            );
        }
    } as FbFormDetailsPluginType,
    {
        name: "forms-form-details-submissions-overview",
        type: "forms-form-details-submissions",
        render({ form }) {
            return <FormSubmissionsOverview form={form} />;
        }
    } as FbFormDetailsSubmissionsPlugin,
    {
        name: "forms-form-details-submissions-list",
        type: "forms-form-details-submissions",
        render({ form }) {
            return <FormSubmissionsList form={form} />;
        }
    } as FbFormDetailsSubmissionsPlugin
];
