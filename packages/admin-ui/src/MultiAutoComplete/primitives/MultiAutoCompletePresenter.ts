import { makeAutoObservable } from "mobx";
import { CommandOption } from "~/Command/CommandOption";
import { CommandOptionFormatter } from "~/Command/CommandOptionFormatter";
import { CommandOptionFormatted } from "~/Command/CommandOptionFormatted";
import { MultiAutoCompleteOption } from "./MultiAutoCompletePrimitive";
import { IMultiAutoCompleteInputPresenter } from "./MultiAutoCompleteInputPresenter";
import { IMultiAutoCompleteSelectedOptionsPresenter } from "./MultiAutoCompleteSelectedOptionsPresenter";
import { IListCache } from "./ListCache";

interface MultiAutoCompletePresenterParams {
    emptyMessage?: any;
    loadingMessage?: any;
    onOpenChange?: (open: boolean) => void;
    onValueReset?: () => void;
    onValuesChange: (values: string[]) => void;
    options?: MultiAutoCompleteOption[];
    placeholder?: string;
    values?: string[];
}

interface IMultiAutoCompletePresenterParams {
    vm: {
        inputVm: IMultiAutoCompleteInputPresenter["vm"];
        selectedOptionsVm: IMultiAutoCompleteSelectedOptionsPresenter["vm"];
        listVm: {
            options: CommandOptionFormatted[];
            emptyMessage: string;
            loadingMessage: string;
            isOpen: boolean;
            isEmpty: boolean;
        };
    };
    init: (params: MultiAutoCompletePresenterParams) => void;
    setListOpenState: (open: boolean) => void;
    setSelectedOption: (value: string) => void;
    resetSelectedOptions: () => void;
    removeSelectedOption: (value: string) => void;
    setInputValue: (value: string) => void;
}

class MultiAutoCompletePresenter implements IMultiAutoCompletePresenterParams {
    private inputPresenter: IMultiAutoCompleteInputPresenter;
    private selectedOptionsPresenter: IMultiAutoCompleteSelectedOptionsPresenter;
    private optionsCache: IListCache<CommandOption>;
    private params?: MultiAutoCompletePresenterParams = undefined;
    private isListOpen = false;

    constructor(
        inputPresenter: IMultiAutoCompleteInputPresenter,
        selectedOptionsPresenter: IMultiAutoCompleteSelectedOptionsPresenter,
        optionsCache: IListCache<CommandOption>
    ) {
        this.inputPresenter = inputPresenter;
        this.selectedOptionsPresenter = selectedOptionsPresenter;
        this.optionsCache = optionsCache;
        makeAutoObservable(this);
    }

    init(params: MultiAutoCompletePresenterParams) {
        this.params = params;

        this.optionsCache.clear();
        const options = this.mapOptions(params.options, params.values);
        this.optionsCache.addItems(options);

        this.inputPresenter.init({
            placeholder: params.placeholder
        });

        const selectedOptions = this.getSelectedOptions();
        this.selectedOptionsPresenter.init({ options: selectedOptions });
    }

    get vm() {
        return {
            inputVm: this.inputPresenter.vm,
            selectedOptionsVm: this.selectedOptionsPresenter.vm,
            listVm: {
                options: this.optionsCache
                    .getItems()
                    .map(option => CommandOptionFormatter.format(option)),
                emptyMessage: this.params?.emptyMessage ?? "No results.",
                loadingMessage: this.params?.loadingMessage ?? "Loading...",
                isOpen: this.isListOpen,
                isEmpty: !this.optionsCache.hasItems()
            }
        };
    }

    public setListOpenState = (open: boolean) => {
        this.isListOpen = open;
        this.params?.onOpenChange?.(open);
    };

    public setSelectedOption = (value: string) => {
        const selectedOption = this.optionsCache.getItem(item => item.value === value);

        if (selectedOption) {
            selectedOption.selected = true;
            this.selectedOptionsPresenter.addOption(selectedOption);
            this.inputPresenter.setValue("");
            this.params?.onValuesChange?.(this.getSelectedValues());
            return;
        }
    };

    public removeSelectedOption = (value: string) => {
        const removedOption = this.optionsCache.getItem(item => item.value === value);

        if (removedOption) {
            removedOption.selected = false;
            this.selectedOptionsPresenter.removeOption(removedOption);
            this.params?.onValuesChange?.(this.getSelectedValues());
            return;
        }
    };

    public setInputValue = (value: string) => {
        this.inputPresenter.setValue(value);
    };

    public resetSelectedOptions = () => {
        this.optionsCache.updateItems(item => {
            item.selected = false;
            return item;
        });
        this.inputPresenter.setValue("");
        this.selectedOptionsPresenter.resetOptions();
        this.params?.onValuesChange?.([]);
        this.params?.onValueReset?.();
    };

    private getSelectedOptions() {
        return this.optionsCache.getItems(item => item.selected);
    }

    private getSelectedValues() {
        return this.getSelectedOptions().map(option => CommandOptionFormatter.format(option).value);
    }

    private mapOptions(
        options: MultiAutoCompleteOption[] = [],
        values: string[] = []
    ): CommandOption[] {
        return options.map(option => {
            const commandOption =
                typeof option === "string"
                    ? CommandOption.createFromString(option)
                    : CommandOption.create(option);

            commandOption.selected = values.includes(commandOption.value);
            return commandOption;
        });
    }
}

export { MultiAutoCompletePresenter, type MultiAutoCompletePresenterParams };
