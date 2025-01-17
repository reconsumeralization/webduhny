import React from "react";
import { useBlock, BlockEditorConfig } from "~/blockEditor";
import { DynamicDocumentProvider } from "~/dataInjection";
import { PbDataBinding, PbDataSource } from "~/types";

const { Ui } = BlockEditorConfig;

export const SetupDynamicDocument = Ui.Layout.createDecorator(Original => {
    return function BlockToDynamicDocument() {
        const [block, updateBlock] = useBlock();

        const onDataSources = (dataSources: PbDataSource[]) => {
            updateBlock(block => ({ ...block, dataSources }));
        };

        const onDataBindings = (dataBindings: PbDataBinding[]) => {
            updateBlock(block => ({ ...block, dataBindings }));
        };

        return (
            <DynamicDocumentProvider
                dataSources={block.dataSources}
                dataBindings={block.dataBindings}
                onDataSources={onDataSources}
                onDataBindings={onDataBindings}
            >
                <Original />
            </DynamicDocumentProvider>
        );
    };
});
