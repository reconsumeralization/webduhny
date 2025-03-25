import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { CmsContentEntry, CmsEditorContentModel } from "~/types";
import { ModelProvider } from "~/admin/components/ModelProvider";
import { useFormRenderer } from "~/admin/components/ContentEntryForm/useFormRenderer";
import { CustomLayout } from "~/admin/components/ContentEntryForm/CustomLayout";
import { DefaultLayout } from "~/admin/components/ContentEntryForm/DefaultLayout";
import { ContentEntryFormProvider } from "./ContentEntryFormProvider";

export interface ContentEntryFormPreviewProps {
    contentModel: CmsEditorContentModel;
}

export const ContentEntryFormPreview = makeDecoratable(
    "ContentEntryFormPreview",
    (props: ContentEntryFormPreviewProps) => {
        const { contentModel } = props;

        const formRenderer = useFormRenderer(contentModel);

        return (
            <ContentEntryFormProvider
                entry={{}}
                model={contentModel}
                persistEntry={entry => Promise.resolve({ entry } as { entry: CmsContentEntry })}
                confirmNavigationIfDirty={false}
            >
                <ModelProvider model={contentModel}>
                    <div
                        className={"wby-h-calc(100vh-260px) wby-overflow-auto"}
                        data-testid={"cms-content-form"}
                    >
                        {formRenderer ? (
                            <CustomLayout model={contentModel} formRenderer={formRenderer} />
                        ) : (
                            <DefaultLayout model={contentModel} />
                        )}
                    </div>
                </ModelProvider>
            </ContentEntryFormProvider>
        );
    }
);
