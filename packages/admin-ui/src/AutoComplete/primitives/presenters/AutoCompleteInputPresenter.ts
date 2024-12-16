import { makeAutoObservable } from "mobx";

interface AutoCompleteInputPresenterParams {
    value?: string;
    placeholder?: string;
}

interface IAutoCompleteInputPresenter {
    vm: {
        placeholder: string;
        value: string;
        hasValue: boolean;
    };
    init: (params: AutoCompleteInputPresenterParams) => void;
    setValue: (query: string) => void;
    resetValue: () => void;
}

class AutoCompleteInputPresenter implements IAutoCompleteInputPresenter {
    private searchQuery?: string = undefined;
    private placeholder?: string = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    init(params?: AutoCompleteInputPresenterParams) {
        this.searchQuery = params?.value;
        this.placeholder = params?.placeholder;
    }

    get vm() {
        return {
            placeholder: this.placeholder || "Start typing or select",
            value: this.searchQuery || "",
            hasValue: !!this.searchQuery
        };
    }

    public setValue = (value: string) => {
        this.searchQuery = value;
    };

    public resetValue = () => {
        this.searchQuery = undefined;
    };
}

export {
    AutoCompleteInputPresenter,
    type IAutoCompleteInputPresenter,
    type AutoCompleteInputPresenterParams
};
