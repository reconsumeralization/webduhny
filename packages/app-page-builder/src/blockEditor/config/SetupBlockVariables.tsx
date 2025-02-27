import React from "react";
import { BlockEditorConfig, useBlock } from "~/blockEditor";
import { useEventActionHandler } from "~/editor";
import { PbBlockVariable } from "~/types";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions";
import { BlockVariablesProvider } from "~/blockVariables/BlockVariablesProvider";
import { DeveloperUtilities as BlockDeveloperUtilities } from "./DeveloperUtilities";
import { RemoveVariablesOnElementDelete } from "./RemoveVariablesOnElementDelete";

const { Ui } = BlockEditorConfig;

export const SetupBlockVariables = Ui.Layout.createDecorator(Original => {
    return function WithBlockVariables() {
        const eventActionHandler = useEventActionHandler();
        const [block, updateBlock] = useBlock();

        const onBlockVariables = (blockVariables: PbBlockVariable[]) => {
            updateBlock(block => ({ ...block, blockVariables }));

            setTimeout(() => {
                eventActionHandler.trigger(
                    new UpdateDocumentActionEvent({
                        history: true
                    })
                );
            });
        };

        return (
            <BlockVariablesProvider
                blockVariables={block.blockVariables}
                onBlockVariables={onBlockVariables}
            >
                <RemoveVariablesOnElementDelete />
                <BlockDeveloperUtilities />
                <Original />
            </BlockVariablesProvider>
        );
    };
});
