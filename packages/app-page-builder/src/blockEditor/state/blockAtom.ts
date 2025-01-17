import { atom } from "recoil";
import { PbEditorElementTree, DynamicDocument } from "~/types";

export interface BlockWithContent extends BlockAtomType {
    content: PbEditorElementTree;
}

export interface BlockAtomType extends DynamicDocument {
    id: string;
    name: string;
    blockCategory: string;
    savedOn?: Date;
    createdBy: {
        id: string | null;
    };
}

export const blockAtom = atom<BlockAtomType>({
    key: "blockAtom",
    default: {
        id: "",
        name: "",
        blockCategory: "",
        blockVariables: [],
        dataBindings: [],
        dataSources: [],
        createdBy: {
            id: null
        }
    }
});
