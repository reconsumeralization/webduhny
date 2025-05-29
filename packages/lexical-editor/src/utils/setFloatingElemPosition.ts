const VERTICAL_GAP = 10;
const HORIZONTAL_OFFSET = 5;

export function setFloatingElemPosition(
    basePosition: ClientRect | null,
    elementToPosition: HTMLElement,
    anchorElem: HTMLElement,
    verticalGap: number = VERTICAL_GAP,
    horizontalOffset: number = HORIZONTAL_OFFSET
): void {
    // A small timeout gives enough time for DOM to update and provides us with correct bounding rect values.
    setTimeout(() => {
        const scrollerElem = anchorElem.parentElement;

        if (basePosition === null || !scrollerElem) {
            elementToPosition.style.opacity = "0";
            elementToPosition.style.transform = "translate(-10000px, -10000px)";
            return;
        }

        const rectToPosition = elementToPosition.getBoundingClientRect();
        const anchorElementRect = anchorElem.getBoundingClientRect();
        const editorScrollerRect = scrollerElem.getBoundingClientRect();

        let top = basePosition.top - rectToPosition.height - verticalGap;
        let left = basePosition.left - horizontalOffset;

        if (top < editorScrollerRect.top) {
            top += rectToPosition.height + basePosition.height + verticalGap * 2;
        }

        if (left + rectToPosition.width > editorScrollerRect.right) {
            left = editorScrollerRect.right - rectToPosition.width - horizontalOffset;
        }

        top -= anchorElementRect.top;
        left -= anchorElementRect.left;

        elementToPosition.style.opacity = "1";
        elementToPosition.style.transform = `translate(${left}px, ${top}px)`;
    }, 10);
}
