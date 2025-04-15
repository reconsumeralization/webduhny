import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRichTextEditor } from "~/hooks";
import { getSelectedNode } from "~/utils/getSelectedNode";
import { BaseSelection } from "lexical";
import { $isAutoLinkNode, $isLinkNode, TOGGLE_LINK_COMMAND } from "@webiny/lexical-nodes";
import { isChildOfLinkEditor } from "~/plugins/FloatingLinkEditorPlugin/isChildOfLinkEditor";
import {
    $getSelection,
    $isRangeSelection,
    BLUR_COMMAND,
    COMMAND_PRIORITY_CRITICAL,
    COMMAND_PRIORITY_LOW,
    SELECTION_CHANGE_COMMAND
} from "lexical";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import { FloatingLinkEditor } from "./FloatingLinkEditorPlugin";
import { HIDE_FLOATING_TOOLBAR } from "~/commands";

const isLink = (selection: BaseSelection | null) => {
    if (!$isRangeSelection(selection)) {
        return;
    }

    const node = getSelectedNode(selection);
    const linkParent = $findMatchingParent(node, $isLinkNode);
    const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode);
    const isLinkOrChildOfLink = Boolean($isLinkNode(node) || linkParent);

    if (!isLinkOrChildOfLink) {
        return false;
    }

    return linkParent !== null && autoLinkParent == null;
};

const isSelectionCollapsed = (selection: BaseSelection | null) => {
    return $isRangeSelection(selection) && selection.isCollapsed();
};

const isLinkFocused = (selection: BaseSelection | null) => {
    return isLink(selection) && isSelectionCollapsed(selection);
};

const isLinkSelected = (selection: BaseSelection | null) => {
    return isLink(selection) && !isSelectionCollapsed(selection);
};

export function useFloatingLinkEditor(anchorElem: HTMLElement): JSX.Element | null {
    const { editor } = useRichTextEditor();
    const [isLinkEditorVisible, setShowLinkEditor] = useState(false);
    const newLinkRef = useRef(false);

    const showLinkEditor = (state: boolean) => {
        setShowLinkEditor(state);
        if (!state) {
            newLinkRef.current = false;
        }
    };

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => {
                    const selection = $getSelection();

                    if (isLinkFocused(selection)) {
                        showLinkEditor(true);
                        return false;
                    }

                    if (isLinkSelected(selection) && newLinkRef.current) {
                        return false;
                    }

                    if (isLinkSelected(selection) && !newLinkRef.current) {
                        showLinkEditor(false);
                        return false;
                    }

                    showLinkEditor(false);

                    return false;
                },
                COMMAND_PRIORITY_LOW
            ),
            editor.registerCommand(
                BLUR_COMMAND,
                payload => {
                    if (!isChildOfLinkEditor(payload.relatedTarget as HTMLElement)) {
                        showLinkEditor(false);
                    }

                    return false;
                },
                COMMAND_PRIORITY_LOW
            ),
            editor.registerCommand(
                TOGGLE_LINK_COMMAND,
                payload => {
                    const addLink = !!payload;

                    if (addLink) {
                        newLinkRef.current = true;
                        showLinkEditor(true);
                        editor.dispatchCommand(HIDE_FLOATING_TOOLBAR, {});
                    } else {
                        showLinkEditor(false);
                    }
                    return false;
                },
                COMMAND_PRIORITY_CRITICAL
            )
        );
    }, [editor]);

    return createPortal(
        <FloatingLinkEditor
            isVisible={isLinkEditorVisible}
            editor={editor}
            anchorElem={anchorElem}
        />,
        anchorElem
    );
}
