import React, { useState } from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { Prompt } from "@webiny/react-router";
import { i18n } from "@webiny/app/i18n";
import { LeftPanel, RightPanel, SplitView } from "@webiny/app-admin/components/SplitView";
import { Heading, OverlayLoader, Separator, Tabs, Text, TimeAgo } from "@webiny/admin-ui";
import { FieldsSidebar } from "./FieldsSidebar";
import { FieldEditor } from "../FieldEditor";
import { PreviewTab } from "./PreviewTab";
import Header from "./Header";
import DragPreview from "../DragPreview";
import { useModelEditor } from "./useModelEditor";
import { CmsEditorFieldsLayout, CmsModelField } from "~/types";
import { ContentEntryEditorWithConfig } from "~/admin/config/contentEntries";
import { ContentEntryProvider } from "~/admin/views/contentEntries/ContentEntry/ContentEntryContext";
import { ContentEntriesProvider } from "~/admin/views/contentEntries/ContentEntriesContext";
import { ModelIsBeingDeletedError } from "~/admin/components/ContentModelEditor/ModelIsBeingDeletedError";

const t = i18n.ns("app-headless-cms/admin/editor");

const prompt = t`There are some unsaved changes! Are you sure you want to navigate away and discard all changes?`;

interface OnChangeParams {
    fields: CmsModelField[];
    layout: CmsEditorFieldsLayout;
}

export const ContentModelEditor = makeDecoratable("ContentModelEditor", () => {
    const { data, setData, isPristine, contentModel } = useModelEditor();

    const [activeTabIndex, setActiveTabIndex] = useState<string>("edit");

    const onChange = ({ fields, layout }: OnChangeParams) => {
        setData(data => ({ ...data, fields, layout }));
    };

    if (!data) {
        return <OverlayLoader text={"Loading content model..."} />;
    } else if (data.isBeingDeleted) {
        return <ModelIsBeingDeletedError model={data} />;
    }

    return (
        <div className={"content-model-editor wby-flex-1"}>
            <Prompt when={!isPristine} message={prompt} />
            <Header />
            {/*TODO: remove the height in favour of a TW variable for the height (h-main-section)*/}
            <div className={"wby-w-full wby-h-[calc(100vh-65px)]"}>
                <SplitView>
                    <LeftPanel span={4} className={"wby-bg-neutral-light"}>
                        <div className={"wby-px-lg wby-py-md"}>
                            <Text
                                className={
                                    "wby-text-accent-primary wby-uppercase wby-font-semibold"
                                }
                            >
                                {"Fields"}
                            </Text>
                        </div>
                        <Separator margin={"none"} />
                        <div
                            className={
                                "wby-px-lg wby-py-md wby-h-[calc(100vh-120px)] wby-overflow-y-auto"
                            }
                        >
                            <FieldsSidebar
                                onFieldDragStart={() => {
                                    setActiveTabIndex("edit");
                                }}
                            />
                        </div>
                    </LeftPanel>
                    <RightPanel span={8} className={"wby-bg-neutral-base"}>
                        {contentModel && (
                            <div className={"wby-px-xl wby-pt-lg wby-pb-md-extra"}>
                                <Heading level={4}>{contentModel.name}</Heading>
                                <Text size={"sm"} className={"wby-text-neutral-muted"}>
                                    {`Created by ${contentModel.createdBy.displayName}. Last modified: `}
                                    <TimeAgo datetime={contentModel.savedOn} />.
                                </Text>
                            </div>
                        )}
                        <Tabs
                            size={"md"}
                            spacing={"xl"}
                            separator={true}
                            value={String(activeTabIndex)}
                            onValueChange={setActiveTabIndex}
                            tabs={[
                                <Tabs.Tab
                                    key={"edit"}
                                    value={"edit"}
                                    trigger={"Edit"}
                                    data-testid={"cms.editor.tab.edit"}
                                    content={
                                        <div className={"wby-relative"}>
                                            <FieldEditor
                                                fields={data.fields}
                                                layout={data.layout || []}
                                                onChange={onChange}
                                            />
                                        </div>
                                    }
                                />,
                                <Tabs.Tab
                                    key={"preview"}
                                    value={"preview"}
                                    trigger={"Preview"}
                                    data-testid={"cms.editor.tab.preview"}
                                    content={
                                        <ContentEntryEditorWithConfig>
                                            <ContentEntriesProvider contentModel={data}>
                                                <ContentEntryProvider readonly={true}>
                                                    <PreviewTab
                                                        activeTab={activeTabIndex === "preview"}
                                                    />
                                                </ContentEntryProvider>
                                            </ContentEntriesProvider>
                                        </ContentEntryEditorWithConfig>
                                    }
                                />
                            ]}
                        />
                    </RightPanel>
                </SplitView>
            </div>
            <DragPreview />
        </div>
    );
});
