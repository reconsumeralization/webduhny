import { makeAutoObservable } from "mobx";

interface MultiAutoCompleteInputPresenterParams {
    value?: string;
    placeholder?: string;
}

interface IMultiAutoCompleteInputPresenter {
    vm: {
        placeholder: string;
        value: string;
        hasValue: boolean;
    };
    init: (params: MultiAutoCompleteInputPresenterParams) => void;
    setValue: (value?: string) => void;
}

class MultiAutoCompleteInputPresenter implements IMultiAutoCompleteInputPresenter {
    private value?: string = undefined;
    private placeholder?: string = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    init(params?: MultiAutoCompleteInputPresenterParams) {
        this.value = params?.value;
        this.placeholder = params?.placeholder;
    }

    get vm() {
        return {
            placeholder: this.placeholder || "Start typing or select",
            value: this.value || "",
            hasValue: !!this.value
        };
    }

    public setValue = (value = "") => {
        this.value = value;
    };
}

export {
    MultiAutoCompleteInputPresenter,
    type IMultiAutoCompleteInputPresenter,
    type MultiAutoCompleteInputPresenterParams
};
