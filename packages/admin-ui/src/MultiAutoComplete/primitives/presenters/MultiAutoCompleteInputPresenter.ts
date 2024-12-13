import { makeAutoObservable } from "mobx";

export interface MultiAutoCompleteInputPresenterParams {
    placeholder?: string;
}

export interface IMultiAutoCompleteInputPresenter {
    vm: {
        placeholder: string;
        value: string;
    };
    init: (params: MultiAutoCompleteInputPresenterParams) => void;
    setValue: (query: string) => void;
    resetValue: () => void;
}

export class MultiAutoCompleteInputPresenter implements IMultiAutoCompleteInputPresenter {
    private searchQuery?: string = undefined;
    private placeholder?: string = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    init(params?: MultiAutoCompleteInputPresenterParams) {
        this.placeholder = params?.placeholder;
    }

    get vm() {
        return {
            placeholder: this.placeholder || "Start typing or select",
            value: this.searchQuery || ""
        };
    }

    public setValue = (value: string) => {
        this.searchQuery = value;
    };

    public resetValue = () => {
        this.searchQuery = undefined;
    };
}
