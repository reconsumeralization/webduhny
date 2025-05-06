import React from "react";
import { PbEditorOverrideActionHandlerPlugin } from "../PbEditorOverrideEventActionPlugin";
import {
    dropElementAction,
    DropElementActionEvent
} from "@webiny/app-page-builder/editor/recoil/actions";
import type { DropElementActionArgsType } from "@webiny/app-page-builder/editor/recoil/actions/dropElement/types";
import type { EventActionCallable } from "@webiny/app-page-builder/types";
import { Snackbar } from "@webiny/ui/Snackbar";
import { useDisclosure } from "../../useDisclosure";

export interface Handler {
    name: string;
    canHandle: () => boolean;
    handle: (params: {
        args: DropElementActionArgsType;
        getDocumentElement: () => Promise<any>;
        getElementById: (id: string) => Promise<any>;
        getElementTree: (params: { element: any }) => Promise<any>;
    }) => Promise<any>;
}

export const OverrideDropElementActionPlugin = () => {
    const {
        open: showSnackbar,
        close: hideSnackbar,
        isOpen: snackbarShown,
        data: snackbarMessage
    } = useDisclosure<string>();

    return (
        <>
        <PbEditorOverrideActionHandlerPlugin
            action={"drop-element"}
            onEditorMount={handler => {
                return handler.on(DropElementActionEvent, (async (...params) => {
                    const [state, , args] = params;

                    return dropElementAction(...params);
                }) as EventActionCallable<DropElementActionArgsType>);
            }}
        />
            <Snackbar
                message={snackbarMessage}
                open={snackbarShown}
                onClose={hideSnackbar}
                timeout={5000}
            />
        </>
    );
};
