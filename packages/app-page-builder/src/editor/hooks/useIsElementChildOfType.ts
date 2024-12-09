import { PbEditorElement } from "~/types";
import { useElementById } from "~/editor";

export const useIsElementChildOfType = (element: PbEditorElement | null, elementType: string) => {
    const [parent] = useElementById(element?.parent || "n/a");

    return parent ? parent.type === elementType : false;
};
