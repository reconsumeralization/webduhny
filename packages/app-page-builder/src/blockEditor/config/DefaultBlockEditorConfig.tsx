import React from "react";
import { BackButton } from "~/blockEditor/config/TopBar/BackButton";
import { Title } from "~/blockEditor/config/TopBar/Title";
import { SaveBlockButton } from "~/blockEditor/config/TopBar/SaveBlockButton";
import { BlockSettingsButton } from "~/blockEditor/config/TopBar/BlockSettings/BlockSettingsButton";
import { ElementSettingsDecorator } from "~/blockEditor/config/ElementSettingsTab";
import { EventActionHandlers, EventActionHandlerDecorator } from "./eventActions";
import { EditorConfig, DefaultEditorConfig } from "~/editor";
import { SetupBlockVariables } from "~/blockEditor/config/SetupBlockVariables";
import { SetupDynamicDocument } from "./SetupDynamicDocument";

const { Ui } = EditorConfig;

export const DefaultBlockEditorConfig = React.memo(() => {
    return (
        <>
            <DefaultEditorConfig />
            <EventActionHandlerDecorator />
            <EditorConfig>
                <EventActionHandlers />
                <Ui.TopBar.Element name={"buttonBack"} group={"left"} element={<BackButton />} />
                <Ui.TopBar.Element name={"title"} group={"left"} element={<Title />} />
                <Ui.TopBar.Action name={"buttonSaveBlock"} element={<SaveBlockButton />} />
                <Ui.TopBar.Action
                    name={"buttonBlockSettings"}
                    element={<BlockSettingsButton />}
                    before={"buttonSaveBlock"}
                />
                <Ui.Toolbar.Element name={"savingIndicator"} remove />
                <ElementSettingsDecorator />
                <SetupBlockVariables />
                {/* DynamicDocument decorator has to be the last one registered, to be the first one mounted. */}
                <SetupDynamicDocument />
            </EditorConfig>
        </>
    );
});

DefaultBlockEditorConfig.displayName = "DefaultBlockEditorConfig";
