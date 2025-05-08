import { makeAutoObservable } from "mobx";
import { State } from "./State.js";

type EditorStateType = {
    selectedElement: string | undefined;
    highlightedElement: string | undefined;
};

export class EditorState {
    private readonly state: State<EditorStateType>;

    constructor(initialState: EditorStateType) {
        this.state = new State<EditorStateType>(initialState);
        makeAutoObservable(this);
    }

    read() {
        return this.state.read();
    }

    getState(): State<EditorStateType> {
        return this.state;
    }

    selectElement(id: string) {
        this.state.update(state => {
            state.selectedElement = id;
        });
    }

    deselectElement() {
        this.state.update(state => {
            state.selectedElement = undefined;
        });
    }

    highlightElement(id: string | undefined) {
        this.state.update(state => {
            state.highlightedElement = id;
        });
    }

    showPanel(name: string, state?: boolean) {}

    toJson() {
        return this.state.toJson();
    }
}
