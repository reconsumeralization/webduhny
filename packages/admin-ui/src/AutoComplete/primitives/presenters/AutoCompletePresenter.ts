import { makeAutoObservable } from "mobx";
import { CommandOption } from "~/Command/CommandOption";
import { CommandOptionFormatter } from "~/Command/CommandOptionFormatter";
import { CommandOptionFormatted } from "~/Command/CommandOptionFormatted";
import { IAutoCompleteInputPresenter } from "./AutoCompleteInputPresenter";
import { AutoCompleteOption } from "../domains";

interface AutoCompletePresenterParams {
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
        listVm: {
            options: CommandOptionFormatted[];
            emptyMessage: string;
            loadingMessage: string;
            isOpen: boolean;
            isEmpty: boolean;
        };
    };
    init: (params: AutoCompletePresenterParams) => void;
    setListOpenState: (open: boolean) => void;
    setSelectedOption: (value: string) => void;
    setInputValue: (value: string) => void;
    resetValue: () => void;
}

class AutoCompletePresenter implements IAutoCompletePresenterParams {
    private inputPresenter: IAutoCompleteInputPresenter;
    private params?: AutoCompletePresenterParams = undefined;
    private options: CommandOption[] = [];
    private isListOpen = false;

    constructor(inputPresenter: IAutoCompleteInputPresenter) {
        this.inputPresenter = inputPresenter;
        makeAutoObservable(this);
    }

    init(params: AutoCompletePresenterParams) {
        this.params = params;
        this.options = this.mapOptions(params.options, params.value);

        const selected = this.getSelectedOption();

        this.inputPresenter.init({
            value: selected ? CommandOptionFormatter.format(selected).label : "",
            placeholder: params.placeholder
        });
    }

    get vm() {
        return {
            inputVm: this.inputPresenter.vm,
            listVm: {
                options: this.options.map(option => CommandOptionFormatter.format(option)),
                emptyMessage: this.params?.emptyMessage ?? "No results.",
                loadingMessage: this.params?.loadingMessage ?? "Loading...",
                isOpen: this.isListOpen,
                isEmpty: this.options.length === 0
            }
        };
    }

    public setListOpenState = (open: boolean) => {
        this.isListOpen = open;
        this.params?.onOpenChange?.(open);
    };

    public setSelectedOption = (value: string) => {
        this.updateSelectedOption(value);
        this.params?.onValueChange?.(value);
    };

    public setInputValue = (value: string) => {
        this.inputPresenter.setValue(value);
    };

    public resetValue = () => {
        this.updateSelectedOption();
        this.inputPresenter.setValue("");
        this.params?.onValueChange?.("");
        this.params?.onValueReset?.();
    };

    private updateSelectedOption(value?: string) {
        const optionToSelect = this.options.find(option => option.value === value);
        this.options.forEach(option => (option.selected = false));

        if (optionToSelect) {
            optionToSelect.selected = true;
            this.inputPresenter.setValue(optionToSelect.label);
            return;
        }
    }

    private getSelectedOption() {
        return this.options.find(option => option.selected);
    }

    private mapOptions(options: AutoCompleteOption[] = [], value?: string): CommandOption[] {
        return options.map(option => {
            const commandOption =
                typeof option === "string"
                    ? CommandOption.createFromString(option)
                    : CommandOption.create(option);

            commandOption.selected = commandOption.value === value;
            return commandOption;
        });
    }
}

export { AutoCompletePresenter, type AutoCompletePresenterParams };
