import React from "react";
import { useEventActionHandler } from "~/editor";
import { PbBlockVariable } from "~/types";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions";
import { BlockVariablesProvider } from "~/blockVariables/BlockVariablesProvider";
import { PageEditorConfig, usePage } from "~/pageEditor";
import { RemoveVariablesOnElementDelete } from "./RemoveVariablesOnElementDelete";

const { Ui } = PageEditorConfig;

export const SetupBlockVariables = Ui.Layout.createDecorator(Original => {
    return function WithBlockVariables() {
        const eventActionHandler = useEventActionHandler();
        const [page, updatePage] = usePage();

        const onBlockVariables = (blockVariables: PbBlockVariable[]) => {
            updatePage(page => ({ ...page, blockVariables }));

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
                blockVariables={page.blockVariables || []}
                onBlockVariables={onBlockVariables}
            >
                <RemoveVariablesOnElementDelete />
                <Original />
            </BlockVariablesProvider>
        );
    };
});
