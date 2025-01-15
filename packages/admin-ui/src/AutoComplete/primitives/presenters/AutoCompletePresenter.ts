import { makeAutoObservable } from "mobx";
import { CommandOption } from "~/Command/domain/CommandOption";
import { IAutoCompleteInputPresenter } from "./AutoCompleteInputPresenter";
import { IAutoCompleteListOptionsPresenter } from "./AutoCompleteListOptionsPresenter";
import { AutoCompleteOption } from "../domains";

interface AutoCompletePresenterParams {
    displayResetAction?: boolean;
    emptyMessage?: any;
    loadingMessage?: any;
    onOpenChange?: (open: boolean) => void;
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
    options?: AutoCompleteOption[];
    placeholder?: string;
    value?: string;
}

interface IAutoCompletePresenterParams {
    vm: {
        inputVm: IAutoCompleteInputPresenter["vm"];
        optionsListVm: IAutoCompleteListOptionsPresenter["vm"];
    };
    init: (params: AutoCompletePresenterParams) => void;
    setListOpenState: (open: boolean) => void;
    setSelectedOption: (value: string) => void;
    searchOption: (value: string) => void;
    resetSelectedOption: () => void;
}

class AutoCompletePresenter implements IAutoCompletePresenterParams {
    private params?: AutoCompletePresenterParams = undefined;
    private inputPresenter: IAutoCompleteInputPresenter;
    private optionsListPresenter: IAutoCompleteListOptionsPresenter;

    constructor(
        inputPresenter: IAutoCompleteInputPresenter,
        optionsListPresenter: IAutoCompleteListOptionsPresenter
    ) {
        this.inputPresenter = inputPresenter;
        this.optionsListPresenter = optionsListPresenter;
        makeAutoObservable(this);
    }

    init(params: AutoCompletePresenterParams) {
        this.params = params;

        const listOptions = this.getListOptions(params.options, params.value);
        this.optionsListPresenter.init({
            options: listOptions,
            emptyMessage: params.emptyMessage,
            loadingMessage: params.loadingMessage
        });

        const selected = this.getSelectedOption();
        this.inputPresenter.init({
            value: selected?.label ?? "",
            placeholder: params.placeholder,
            displayResetAction: params.displayResetAction
        });
    }

    get vm() {
        return {
            inputVm: this.inputPresenter.vm,
            optionsListVm: this.optionsListPresenter.vm
        };
    }

    public setListOpenState = (open: boolean) => {
        this.optionsListPresenter.setListOpenState(open);
        this.params?.onOpenChange?.(open);
    };

    public searchOption = (value: string) => {
        this.inputPresenter.setValue(value);
    };

    public setSelectedOption = (value: string) => {
        this.resetSelectedOption();
        this.optionsListPresenter.setSelectedOption(value);
        const option = this.getSelectedOption();

        if (option) {
            this.searchOption(option.label);
        }

        this.params?.onValueChange?.(value);
    };

    public resetSelectedOption = () => {
        this.optionsListPresenter.resetSelectedOption();
        this.inputPresenter.resetValue();

        this.params?.onValueChange?.("");
        this.params?.onValueReset?.();
    };

    private getListOptions(options: AutoCompleteOption[] = [], value?: string): CommandOption[] {
        return options.map(option => {
            const commandOption =
                typeof option === "string"
                    ? CommandOption.createFromString(option)
                    : CommandOption.create(option);

            commandOption.selected = commandOption.value === value;
            return commandOption;
        });
    }

    private getSelectedOption() {
        return this.vm.optionsListVm.options.find(option => option.selected);
    }
}

export { AutoCompletePresenter, type AutoCompletePresenterParams };
