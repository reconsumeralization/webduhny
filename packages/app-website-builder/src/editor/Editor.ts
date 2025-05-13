import { CommandBus, type Command, CommandHandler } from "./CommandBus.js";
import { type StateChangeListener, StateWithHistory } from "./StateWithHistory.js";
import { EditorState } from "./EditorState.js";
import { type MutableState } from "./State.js";

export class Editor<TDocument extends Record<string, any> = Record<string, any>> {
    private readonly documentState: StateWithHistory<TDocument>;
    private readonly editorState: EditorState;
    private readonly commandBus: CommandBus;

    constructor(initialState: TDocument) {
        this.commandBus = new CommandBus();
        this.documentState = new StateWithHistory(initialState);
        this.editorState = new EditorState({
            selectedElement: undefined,
            highlightedElement: undefined
        });
    }

    registerCommand<T>(command: Command<T>, handler: CommandHandler<T>, priority = 0) {
        return this.commandBus.register(command, handler, priority);
    }

    executeCommand<T>(command: Command<T>, payload: T) {
        return this.commandBus.execute(command, payload);
    }

    undo() {
        this.documentState.undo();
    }

    redo() {
        this.documentState.redo();
    }

    updateDocument(cb: (state: MutableState<TDocument>) => void) {
        this.documentState.update(cb);
    }

    updateEditor(cb: (state: EditorState) => void) {
        cb(this.editorState);
    }

    getEditorState() {
        return this.editorState;
    }

    getDocumentState() {
        return this.documentState;
    }

    onDocumentStateChange(listener: StateChangeListener<TDocument>) {
        return this.documentState.onStateChange(listener);
    }
}
