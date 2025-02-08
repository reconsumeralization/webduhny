import { useCallback } from "react";
import { plugins } from "@webiny/plugins";
import { useEventActionHandler } from "~/editor";
import { DeleteElementActionEvent } from "~/editor/recoil/actions";
import type { PbEditorElement, PbEditorPageElementPlugin } from "~/types";

export const useDeleteElement = () => {
    const eventActionHandler = useEventActionHandler();

    const canDeleteElement = useCallback((element: PbEditorElement) => {
        const plugin = plugins
            .byType<PbEditorPageElementPlugin>("pb-editor-page-element")
            .find(pl => pl.elementType === element.type);

        if (!plugin) {
            return false;
        }

        if (typeof plugin.canDelete === "function") {
            if (!plugin.canDelete({ element })) {
                return false;
            }
        }

        return true;
    }, []);

    const deleteElement = useCallback(async (element: PbEditorElement): Promise<void> => {
        eventActionHandler.trigger(
            new DeleteElementActionEvent({
                element
            })
        );
    }, []);

    return { canDeleteElement, deleteElement };
};
