import React, { useCallback } from "react";
import { useActiveElement } from "~/editor/hooks/useActiveElement";
import { useUpdateElement } from "~/editor/hooks/useUpdateElement";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler";
import { PbElement } from "~/types";

interface UnlinkBlockActionPropsType {
    children: React.ReactElement;
}

const UnlinkBlockAction = ({ children }: UnlinkBlockActionPropsType) => {
    const [element] = useActiveElement();
    const { getElementTree } = useEventActionHandler();
    const updateElement = useUpdateElement();

    // TODO: extract block unlinking logic into a dedicated hook
    const onClick = useCallback(async (): Promise<void> => {
        if (!element) {
            return;
        }

        const newElement = structuredClone(element);
        delete newElement.data["blockId"];
        delete newElement.data["templateBlockId"];
        delete newElement.data["variables"];

        const fullElementTree = (await getElementTree({ element: newElement })) as PbElement;

        updateElement(fullElementTree);
    }, [element, updateElement]);

    return React.cloneElement(children, { onClick });
};

export default React.memo(UnlinkBlockAction);
