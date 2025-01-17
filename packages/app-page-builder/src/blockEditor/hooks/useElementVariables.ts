import { PbEditorElement } from "~/types";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";

/**
 * Get block variable definitions for the given element.
 */
export const useElementVariables = (element: PbEditorElement | null) => {
    const { blockVariables } = useBlockVariables();

    if (!element) {
        return { variables: [] };
    }

    if (element.type === "block") {
        return {
            variables: blockVariables.filter(bv => bv.blockId === element.id)
        };
    }

    return { variables: blockVariables.filter(bv => bv.elementId === element.id) };
};
