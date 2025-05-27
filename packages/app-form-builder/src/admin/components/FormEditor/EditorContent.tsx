import React, { useCallback, useState } from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { EditTab } from "./Tabs/EditTab";
import { TriggersTab } from "./Tabs/TriggersTab";
import { PreviewTab } from "./Tabs/PreviewTab";
import { Fields } from "./Fields";
import { Heading, Separator, Tabs, Text, TimeAgo } from "@webiny/admin-ui";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { ReactComponent as PreviewIcon } from "@webiny/icons/fullscreen.svg";
import { ReactComponent as TriggerIcon } from "@webiny/icons/share.svg";
import { useFormEditor } from "~/admin/components/FormEditor/Context";

const EditorContent = () => {
    const [activeTab, setActiveTab] = useState<string>("edit");
    const { state } = useFormEditor();

    const onFieldDragStart = useCallback(() => {
        setActiveTab("edit");
    }, []);

    return (
        <SplitView>
            <LeftPanel span={4} className={"wby-bg-neutral-light"}>
                <div className={"wby-px-lg wby-py-md"}>
                    <Text
                        as={"div"}
                        className={"wby-uppercase wby-font-semibold wby-text-neutral-xstrong"}
                    >
                        {"Form elements"}
                    </Text>
                </div>
                <Separator />
                <div className={"wby-px-lg wby-py-md wby-h-[calc(100vh-98px)] wby-overflow-y-auto"}>
                    <Fields onFieldDragStart={onFieldDragStart} />
                </div>
            </LeftPanel>
            <RightPanel span={8} className={"wby-bg-neutral-base"}>
                {state.data && (
                    <div className={"wby-px-xl wby-pt-lg wby-pb-md-extra"}>
                        <Heading level={4}>{state.data.name}</Heading>
                        <Text size={"sm"} className={"wby-text-neutral-muted"}>
                            {`Created by ${state.data?.createdBy?.displayName}. Last modified: `}
                            <TimeAgo datetime={state.data.savedOn} />.
                        </Text>
                    </div>
                )}

                <Tabs
                    size={"md"}
                    spacing={"xl"}
                    separator={true}
                    value={activeTab}
                    onValueChange={setActiveTab}
                    tabs={[
                        <Tabs.Tab
                            key={"edit"}
                            value={"edit"}
                            trigger={"Edit"}
                            icon={<EditIcon />}
                            content={<EditTab />}
                        />,
                        <Tabs.Tab
                            key={"preview"}
                            value={"preview"}
                            trigger={"Preview"}
                            icon={<PreviewIcon />}
                            content={<PreviewTab />}
                        />,
                        <Tabs.Tab
                            key={"triggers"}
                            value={"triggers"}
                            trigger={"Triggers"}
                            icon={<TriggerIcon />}
                            content={<TriggersTab />}
                        />
                    ]}
                />
            </RightPanel>
        </SplitView>
    );
};

export default EditorContent;
