import { makeAutoObservable } from "mobx";
import { CommandOption } from "~/Command/domain/CommandOption";
import { CommandOptionFormatted } from "~/Command/domain/CommandOptionFormatted";
import { CommandOptionFormatter } from "~/Command/domain/CommandOptionFormatter";
import { ListCache } from "../domains";

export interface IAutoCompleteListOptionsPresenterParams {
    options?: CommandOption[];
    emptyMessage?: any;
    loadingMessage?: any;
}

export interface IAutoCompleteListOptionsPresenter {
    vm: {
        options: CommandOptionFormatted[];
        emptyMessage: string;
        loadingMessage: string;
        isOpen: boolean;
        isEmpty: boolean;
    };
    init: (params: IAutoCompleteListOptionsPresenterParams) => void;
    setListOpenState: (open: boolean) => void;
    setSelectedOption: (value: string) => void;
    removeSelectedOption: (value: string) => void;
    resetSelectedOption: () => void;
}

export class AutoCompleteListOptionsPresenter implements IAutoCompleteListOptionsPresenter {
    private isOpen = false;
    private emptyMessage = "No results.";
    private loadingMessage = "Loading...";
    private options = new ListCache<CommandOption>();

    constructor() {
        makeAutoObservable(this);
    }

    init(params: IAutoCompleteListOptionsPresenterParams) {
        this.options.clear();
        params.options && this.options.addItems(params.options);
        this.emptyMessage = params.emptyMessage || this.emptyMessage;
        this.loadingMessage = params.loadingMessage || this.loadingMessage;
    }

    get vm() {
        return {
            options: this.options.getItems().map(option => CommandOptionFormatter.format(option)),
            emptyMessage: this.emptyMessage,
            loadingMessage: this.loadingMessage,
            isOpen: this.isOpen,
            isEmpty: !this.options.hasItems()
        };
    }

    setListOpenState = (open: boolean) => {
        this.isOpen = open;
    };

    setSelectedOption = (value: string) => {
        this.options.updateItems(option => {
            if (option.value === value) {
                option.selected = true;
            }

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
