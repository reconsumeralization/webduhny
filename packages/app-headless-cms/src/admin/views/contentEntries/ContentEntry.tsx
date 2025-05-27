import React, { useState } from "react";
import { makeDecoratable } from "@webiny/app";
import { RevisionsList } from "./ContentEntry/RevisionsList/RevisionsList";
import { useContentEntry } from "./hooks/useContentEntry";
import { Header } from "~/admin/components/ContentEntryForm/Header";
import { ContentEntryForm } from "~/admin/components/ContentEntryForm/ContentEntryForm";
import { usePersistEntry } from "~/admin/hooks/usePersistEntry";
import { FormValidation } from "@webiny/form";
import { ValidationIndicators } from "./ValidationIndicators";
import { OverlayLoader, Tabs } from "@webiny/admin-ui";

declare global {
    // eslint-disable-next-line
    namespace JSX {
        interface IntrinsicElements {
            "test-id": {
                children?: React.ReactNode;
            };
        }
    }
}

export const ContentEntry = makeDecoratable("ContentEntry", () => {
    const { loading, entry, activeTab, setActiveTab } = useContentEntry();
    const [invalidFields, setInvalidFields] = useState<FormValidation | undefined>(undefined);
    const { persistEntry } = usePersistEntry({ addItemToListCache: true });

    return (
        <div>
            <test-id data-testid="cms-content-details">
                <Tabs
                    id={"cms-content-details-tabs"}
                    size={"md"}
                    separator={true}
                    spacing={"lg"}
                    value={activeTab}
                    onValueChange={setActiveTab}
                    tabs={[
                        <Tabs.Tab
                            key={"content"}
                            value={"content"}
                            trigger={"Content"}
                            disabled={loading}
                            data-testid={"cms.content-form.tabs.content"}
                            content={
                                <div className={"wby-relative"}>
                                    {invalidFields ? (
                                        <ValidationIndicators invalidFields={invalidFields} />
                                    ) : null}
                                    {loading && <OverlayLoader />}
                                    <ContentEntryForm
                                        entry={entry}
                                        persistEntry={persistEntry}
                                        header={<Header />}
                                        onInvalidFields={invalidFields =>
                                            setInvalidFields(invalidFields)
                                        }
                                    />
                                </div>
                            }
                        />,
                        <Tabs.Tab
                            key={"revisions"}
                            value={"revisions"}
                            trigger={"Revisions"}
                            disabled={loading}
                            data-testid={"cms.content-form.tabs.revisions"}
                            content={<RevisionsList />}
                        />
                    ]}
                ></Tabs>
            </test-id>
        </div>
    );
});
