import { plugins } from "@webiny/plugins";
import type { Renderer } from "@webiny/app-page-builder-elements/types";
import type { PbRenderElementPlugin } from "~/types";

/**
 * Returns a getter fpr element renderer inputs. These are defined for each individual renderer, when using
 * `createRenderer` factory function.
 */
export const useGetElementRendererInputs = () => {
    return (type: string) => {
        const renderers = plugins
            .byType<PbRenderElementPlugin>("pb-render-page-element")
            .reduce<Record<string, Renderer>>((current, item) => {
                return { ...current, [item.elementType]: item.render };
            }, {});

        const renderer = renderers[type];

        return renderer && renderer.inputs ? Object.values(renderer.inputs) : [];
    };
};
