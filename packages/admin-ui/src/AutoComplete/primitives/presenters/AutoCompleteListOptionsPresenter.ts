import { makeAutoObservable } from "mobx";
import { CommandOption } from "~/Command/domain/CommandOption";
import { CommandOptionFormatted } from "~/Command/domain/CommandOptionFormatted";
import { CommandOptionFormatter } from "~/Command/domain/CommandOptionFormatter";
import { ListCache } from "../domains";

export interface IAutoCompleteListOptionsPresenterParams {
    options?: CommandOption[];
    emptyMessage?: any;
    loadingMessage?: any;
    initialMessage?: any;
}

export interface IAutoCompleteListOptionsPresenter {
    vm: {
        options: CommandOptionFormatted[];
        emptyMessage: any;
        loadingMessage: any;
        open: boolean;
        empty: boolean;
    };
    init: (params: IAutoCompleteListOptionsPresenterParams) => void;
    setListOpenState: (open: boolean) => void;
    setLoadedOptions: (loaded: boolean) => void;
    setSelectedOption: (value: string) => void;
    removeSelectedOption: (value: string) => void;
    resetSelectedOption: () => void;
}

export class AutoCompleteListOptionsPresenter implements IAutoCompleteListOptionsPresenter {
    private open = false;
    private loadedOptions = false;
    private emptyMessage = "No results.";
    private loadingMessage = "Loading...";
    private initialMessage = "Start typing to find an option.";
    private options = new ListCache<CommandOption>();

    constructor() {
        makeAutoObservable(this);
    }

    init(params: IAutoCompleteListOptionsPresenterParams) {
        this.options.clear();
        params.options && this.options.addItems(params.options);
        this.emptyMessage = params.emptyMessage || this.emptyMessage;
        this.loadingMessage = params.loadingMessage || this.loadingMessage;
        this.initialMessage = params.initialMessage || this.initialMessage;
    }

    get vm() {
        return {
            options: this.options.getItems().map(option => CommandOptionFormatter.format(option)),
            emptyMessage: this.loadedOptions ? this.emptyMessage : this.initialMessage,
            loadingMessage: this.loadingMessage,
            open: this.open,
            empty: !this.options.hasItems()
        };
    }

    setListOpenState = (open: boolean) => {
        this.open = open;
    };

    setLoadedOptions = (loaded: boolean) => {
        this.loadedOptions = loaded;
    };

    setSelectedOption = (value: string) => {
        this.options.updateItems(option => {
            option.selected = option.value === value;
            return option;
        });
    };

    removeSelectedOption = (value: string) => {
        this.options.updateItems(option => {
            if (option.value === value) {
                option.selected = false;
            }

            return option;
        });
    };

    resetSelectedOption = () => {
        this.options.updateItems(option => {
            option.selected = false;
            return option;
        });
    };
}
