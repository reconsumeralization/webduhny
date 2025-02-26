import { plugins } from "@webiny/plugins";
import type { Renderer } from "@webiny/app-page-builder-elements/types";
import type { PbRenderElementPlugin } from "~/types";

/**
 * Gets element renderer inputs. These are defined for each individual renderer, when using
 * `createRenderer` factory function.
 */
export const useElementRendererInputs = (type: string | undefined) => {
    const renderers = plugins
        .byType<PbRenderElementPlugin>("pb-render-page-element")
        .reduce<Record<string, Renderer>>((current, item) => {
            return { ...current, [item.elementType]: item.render };
        }, {});

    if (!type) {
        return { inputs: [] };
    }

    const renderer = renderers[type];

    return { inputs: renderer && renderer.inputs ? Object.values(renderer.inputs) : [] };
};
