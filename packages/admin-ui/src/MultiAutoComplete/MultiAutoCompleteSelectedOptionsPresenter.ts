import { makeAutoObservable } from "mobx";
import { CommandOption } from "~/Command/CommandOption";
import { CommandOptionFormatter } from "~/Command/CommandOptionFormatter";
import { CommandOptionFormatted } from "~/Command/CommandOptionFormatted";
import { IListCache } from "~/MultiAutoComplete/ListCache";

interface MultiAutoCompleteSelectedOptionsPresenterParams {
    options?: CommandOption[];
}

interface IMultiAutoCompleteSelectedOptionsPresenter {
    vm: {
        options: CommandOptionFormatted[];
    };
    init: (params: MultiAutoCompleteSelectedOptionsPresenterParams) => void;
    addOption: (value: CommandOption) => void;
    removeOption: (option: CommandOption) => void;
    resetOptions: () => void;
}

class MultiAutoCompleteSelectedOptionsPresenter
    implements IMultiAutoCompleteSelectedOptionsPresenter
{
    private optionsCache: IListCache<CommandOption>;

    constructor(optionsCache: IListCache<CommandOption>) {
        this.optionsCache = optionsCache;
        makeAutoObservable(this);
    }

    init(params: MultiAutoCompleteSelectedOptionsPresenterParams) {
        this.optionsCache.clear();
        if (params.options) {
            this.optionsCache.addItems(params.options);
        }
    }

    get vm() {
        return {
            options: this.optionsCache
                .getItems()
                .map(option => CommandOptionFormatter.format(option))
        };
    }

    addOption(value: CommandOption) {
        this.optionsCache.addItems([value]);
    }

    removeOption(option: CommandOption) {
        this.optionsCache.removeItems(opt => opt.value === option.value);
    }

    resetOptions() {
        this.optionsCache.clear();
    }
}

export {
    MultiAutoCompleteSelectedOptionsPresenter,
    type IMultiAutoCompleteSelectedOptionsPresenter,
    type MultiAutoCompleteSelectedOptionsPresenterParams
};
