import invariant from "invariant";
import { plugins } from "@webiny/plugins";
import { prefixElementIdsRecursively } from "~/editor/helpers";
import { PbEditorBlockPlugin, PbEditorElement } from "~/types";

export const createBlockReference = (name: string, blockId: string): PbEditorElement => {
    const plugin = plugins.byName<PbEditorBlockPlugin>(name);

    invariant(plugin, `Missing block plugin "${name}"!`);
    /**
     * Used ts-ignore because TS is complaining about always overriding some properties
     */

    const blockElement = plugin.create();

    return {
        ...blockElement,
        id: blockId,
        elements: prefixElementIdsRecursively(blockElement.elements as PbEditorElement[], blockId),
        data: {
            ...blockElement.data,
            blockId: plugin.id
        }
    };
};
