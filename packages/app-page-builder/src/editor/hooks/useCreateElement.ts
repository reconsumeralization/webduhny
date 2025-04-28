import { useCallback } from "react";
import { PbEditorElement } from "~/types";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler";
import { CreateElementActionEvent } from "~/editor/recoil/actions";

export const useCreateElement = () => {
    const handler = useEventActionHandler();

    return useCallback(
        (element: PbEditorElement, source: PbEditorElement) => {
            handler.trigger(
                new CreateElementActionEvent(
                    {
                        element,
                        source
                    },
                    { isLast: true }
                )
            );
        },
        [handler]
    );
};
