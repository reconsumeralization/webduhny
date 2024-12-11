import React from "react";
import { PageEditorConfig } from "@webiny/app-page-builder/pageEditor";
import { DynamicDocumentProvider } from "~/dataInjection";
import { usePage } from "@webiny/app-page-builder/pageEditor";
import {
    PbPageTemplateDataBinding,
    PbPageTemplateDataSource
} from "@webiny/app-page-builder/types";
import { useEventActionHandler } from "@webiny/app-page-builder/editor";
import { UpdateDocumentActionEvent } from "@webiny/app-page-builder/editor/recoil/actions";

const { Ui } = PageEditorConfig;

export const SetupDynamicDocument = Ui.Layout.createDecorator(Original => {
    return function PageToDynamicDocument() {
        const eventActionHandler = useEventActionHandler();
        const [page, updatePage] = usePage();

        const onDataSources = (dataSources: PbPageTemplateDataSource[]) => {
            updatePage(page => ({ ...page, dataSources }));
            eventActionHandler.trigger(
                new UpdateDocumentActionEvent({
                    history: false,
                    document: {
                        dataSources
                    }
                })
            );
        };

        const onDataBindings = (dataBindings: PbPageTemplateDataBinding[]) => {
            updatePage(page => ({ ...page, dataBindings }));
            eventActionHandler.trigger(
                new UpdateDocumentActionEvent({
                    history: false,
                    document: {
                        dataBindings
                    }
                })
            );
        };

        return (
            <DynamicDocumentProvider
                dataSources={page.dataSources || []}
                dataBindings={page.dataBindings || []}
                onDataSources={onDataSources}
                onDataBindings={onDataBindings}
            >
                <Original />
            </DynamicDocumentProvider>
        );
    };
});
