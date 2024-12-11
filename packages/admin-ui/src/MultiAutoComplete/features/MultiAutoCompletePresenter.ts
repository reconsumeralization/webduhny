import { makeAutoObservable } from "mobx";
import { Abstraction, createImplementation } from "@webiny/di-container";
import { CommandOption } from "~/Command/CommandOption";
import { CommandOptionFormatted } from "~/Command/CommandOptionFormatted";
import { CommandOptionFormatter } from "~/Command/CommandOptionFormatter";
import {
    IListCache,
    IListOpenStateCache,
    ISearchQueryCache,
    ListOpenStateCacheAbstraction,
    MultiAutoCompleteOption,
    OptionsCacheAbstraction,
    SearchQueryCacheAbstraction,
    SelectedOptionsCacheAbstraction
} from "../domains";
import { ILoadOptionsUseCase, LoadOptionsUseCaseAbstraction } from "./loadOptions";
import {
    ISetSelectedOptionUseCase,
    SetSelectedOptionUseCaseAbstraction
} from "./setSelectedOption";
import { ISetListOpenStateUseCase, SetListOpenStateUseCaseAbstraction } from "./setListOpenState";
import {
    IRemoveSelectedOptionUseCase,
    RemoveSelectedOptionUseCaseAbstraction
} from "./removeSelectedOption";
import {
    IResetSelectedOptionsUseCase,
    ResetSelectedOptionUseCaseAbstraction
} from "./resetSelectedOptions";
import { ISearchOptionUseCase, SearchOptionUseCaseAbstraction } from "./searchOption";
import {
    CreateOptionUseCaseAbstraction,
    ICreateOptionUseCase
} from "~/MultiAutoComplete/features/createOption";
import { container } from "./container";

interface MultiAutoCompletePresenterParams {
    allowFreeInput?: boolean;
    emptyMessage?: any;
    loadingMessage?: any;
    onOpenChange?: (open: boolean) => void;
    onValueReset?: () => void;
    onValuesChange: (values: string[]) => void;
    options?: MultiAutoCompleteOption[];
    placeholder?: string;
    values?: string[];
}

interface IMultiAutoCompletePresenter {
    vm: {
        inputVm: {
            placeholder: string;
            value: string;
        };
        selectedOptionsVm: {
            options: CommandOptionFormatted[];
            isEmpty: boolean;
        };
        temporaryOption: {
            option: CommandOptionFormatted;
        };
        optionsListVm: {
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
    removeSelectedOption: (value: string) => void;
    resetSelectedOptions: () => void;
    searchOption: (value: string) => void;
    createOption: (value: string) => void;
}

class MultiAutoCompletePresenter implements IMultiAutoCompletePresenter {
    private params?: MultiAutoCompletePresenterParams = undefined;
    private listOpenStateCache: IListOpenStateCache;
    private listOptionsCache: IListCache<CommandOption>;
    private selectedOptionsCache: IListCache<CommandOption>;
    private searchQueryCache: ISearchQueryCache;
    private loadOptionsUseCase: ILoadOptionsUseCase;
    private setSelectedOptionUseCase: ISetSelectedOptionUseCase;
    private setOpenListStateUseCase: ISetListOpenStateUseCase;
    private removeSelectedOptionUseCase: IRemoveSelectedOptionUseCase;
    private resetSelectedOptionsUseCase: IResetSelectedOptionsUseCase;
    private searchOptionUseCase: ISearchOptionUseCase;
    private createOptionUseCase: ICreateOptionUseCase;

    constructor(
        listOpenStateCache: IListOpenStateCache,
        listOptionsCache: IListCache<CommandOption>,
        selectedOptionsCache: IListCache<CommandOption>,
        searchQueryCache: ISearchQueryCache,
        loadOptionsUseCase: ILoadOptionsUseCase,
        setSelectedOptionUseCase: ISetSelectedOptionUseCase,
        setOpenListStateUseCase: ISetListOpenStateUseCase,
        removeSelectedOptionUseCase: IRemoveSelectedOptionUseCase,
        resetSelectedOptionsUseCase: IResetSelectedOptionsUseCase,
        searchOptionUseCase: ISearchOptionUseCase,
        createOptionUseCase: ICreateOptionUseCase
    ) {
        this.listOpenStateCache = listOpenStateCache;
        this.listOptionsCache = listOptionsCache;
        this.selectedOptionsCache = selectedOptionsCache;
        this.searchQueryCache = searchQueryCache;
        this.loadOptionsUseCase = loadOptionsUseCase;
        this.setSelectedOptionUseCase = setSelectedOptionUseCase;
        this.setOpenListStateUseCase = setOpenListStateUseCase;
        this.removeSelectedOptionUseCase = removeSelectedOptionUseCase;
        this.resetSelectedOptionsUseCase = resetSelectedOptionsUseCase;
        this.searchOptionUseCase = searchOptionUseCase;
        this.createOptionUseCase = createOptionUseCase;
        makeAutoObservable(this);
    }

    init(params: MultiAutoCompletePresenterParams) {
        this.params = params;
        const options = this.params.options || [];
        const values = this.params.values || [];
        this.loadOptionsUseCase.execute(options, values);
    }

    get vm() {
        return {
            inputVm: {
                placeholder: this.params?.placeholder ?? "Start typing or select",
                value: this.searchQueryCache.getState()
            },
            selectedOptionsVm: {
                options: this.selectedOptionsCache
                    .getItems()
                    .map(option => CommandOptionFormatter.format(option)),
                isEmpty: !this.selectedOptionsCache.hasItems()
            },
            optionsListVm: {
                options: this.listOptionsCache
                    .getItems()
                    .map(option => CommandOptionFormatter.format(option)),
                emptyMessage: this.params?.emptyMessage ?? "No results.",
                loadingMessage: this.params?.loadingMessage ?? "Loading...",
                isOpen: this.listOpenStateCache.getState(),
                isEmpty: !this.listOptionsCache.hasItems()
            },
            temporaryOption: {
                option: CommandOptionFormatter.format(
                    CommandOption.createFromString(this.searchQueryCache.getState())
                )
            }
        };
    }

    public setListOpenState = (open: boolean) => {
        this.setOpenListStateUseCase.execute(open);
        this.params?.onOpenChange?.(open);
    };

    public setSelectedOption = (value: string) => {
        this.setSelectedOptionUseCase.execute(value);
        this.params?.onValuesChange?.(this.getSelectedValues());
    };

    public removeSelectedOption = (value: string) => {
        this.removeSelectedOptionUseCase.execute(value);
        this.params?.onValuesChange?.(this.getSelectedValues());
    };

    public resetSelectedOptions = () => {
        this.resetSelectedOptionsUseCase.execute();
        this.params?.onValuesChange?.([]);
        this.params?.onValueReset?.();
    };

    public searchOption = (value: string) => {
        this.searchOptionUseCase.execute(value);
    };

    public createOption = (value: string) => {
        if (this.params?.allowFreeInput) {
            this.createOptionUseCase.execute(value);
            this.params?.onValuesChange?.(this.getSelectedValues());
        }
    };

    private getSelectedOptions() {
        return this.selectedOptionsCache.getItems();
    }

    private getSelectedValues() {
        return this.getSelectedOptions().map(option => option.value);
    }

    private getEmptyMessage() {
        if (this.params?.allowFreeInput) {
            return `Add "${this.searchQueryCache.getState()}" as a custom option`;
        }

        return this.params?.emptyMessage ?? "No results.";
    }
}

const MultiAutoCompletePresenterAbstraction = new Abstraction<IMultiAutoCompletePresenter>(
    "MultiAutoCompletePresenter"
);

const MultiAutoCompletePresenterImpl = createImplementation({
    abstraction: MultiAutoCompletePresenterAbstraction,
    implementation: MultiAutoCompletePresenter,
    dependencies: [
        ListOpenStateCacheAbstraction,
        OptionsCacheAbstraction,
        SelectedOptionsCacheAbstraction,
        SearchQueryCacheAbstraction,
        LoadOptionsUseCaseAbstraction,
        SetSelectedOptionUseCaseAbstraction,
        SetListOpenStateUseCaseAbstraction,
        RemoveSelectedOptionUseCaseAbstraction,
        ResetSelectedOptionUseCaseAbstraction,
        SearchOptionUseCaseAbstraction,
        CreateOptionUseCaseAbstraction
    ]
});

container.register(MultiAutoCompletePresenterImpl);

export {
    MultiAutoCompletePresenter,
    MultiAutoCompletePresenterAbstraction,
    type IMultiAutoCompletePresenter,
    type MultiAutoCompletePresenterParams
};
