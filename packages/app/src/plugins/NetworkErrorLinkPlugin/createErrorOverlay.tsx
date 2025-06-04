import React from "react";
/**
 * TODO fix with react 19
 */
// eslint-disable-next-line react/no-deprecated
import { render } from "react-dom";

interface CreateErrorOverlayParams {
    element: React.ReactElement;
    closeable?: boolean;
}

const createErrorOverlay = (params: CreateErrorOverlayParams): void => {
    const { element } = params;
    // If the element already present in DOM, return immediately.
    if (document.getElementById("overlay-root")) {
        return;
    }
    // Create root element to hold React tree.
    const container: HTMLDivElement = document.createElement("div");
    container.id = "overlay-root";
    // Insert root element into body.
    const body: HTMLBodyElement = document.getElementsByTagName("body")[0];
    body.appendChild(container);
    // Mount the ErrorOverlay component into root element.
    render(element, container);
};

export default createErrorOverlay;
