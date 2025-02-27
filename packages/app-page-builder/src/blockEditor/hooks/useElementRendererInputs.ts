import { useGetElementRendererInputs } from "~/blockEditor";

/**
 * Gets element renderer inputs. These are defined for each individual renderer, when using
 * `createRenderer` factory function.
 */
export const useElementRendererInputs = (type: string | undefined) => {
    const getInputs = useGetElementRendererInputs();

    if (!type) {
        return { inputs: [] };
    }

    return { inputs: getInputs(type) };
};
