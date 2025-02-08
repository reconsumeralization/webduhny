import { EventActionHandlerCallableState, PbEditorElement } from "~/types";
import { ContentTraverser, ElementNode } from "./ContentTraverser";

export type { ElementNode };

/**
 * Get a flat array of descendants of the given element.
 */
export const getDescendantsOfElement = async (
    state: EventActionHandlerCallableState,
    element: PbEditorElement
) => {
    const withDescendants = await state.getElementTree({ element });

    const traverser = new ContentTraverser();
    const descendants: ElementNode[] = [element as ElementNode];

    traverser.traverse(withDescendants, node => {
        descendants.push(node);
    });

    return descendants;
};
