import { makeAutoObservable } from "mobx";
import { CommandOptionFormatted } from "~/Command/domain/CommandOptionFormatted";
import { CommandOptionFormatter } from "~/Command/domain/CommandOptionFormatter";
import { CommandOption } from "~/Command/domain/CommandOption";
import { ListCache } from "../domains";

interface IMultiAutoCompleteSelectedOptionsParams {
    options?: CommandOption[];
}

export interface IMultiAutoCompleteSelectedOptionsPresenter {
    vm: {
        options: CommandOptionFormatted[];
        isEmpty: boolean;
    };
    init: (params: IMultiAutoCompleteSelectedOptionsParams) => void;
    addOption: (option: CommandOption) => void;
    removeOption: (value: string) => void;
    resetOptions: () => void;
}

export class MultiAutoCompleteSelectedOptionPresenter
    implements IMultiAutoCompleteSelectedOptionsPresenter
{
    private options = new ListCache<CommandOption>();

    constructor() {
        makeAutoObservable(this);
    }

    init(params: IMultiAutoCompleteSelectedOptionsParams) {
        this.options.clear();
        params.options && this.options.addItems(params.options);
    }

    get vm() {
        return {
            options: this.options.getItems().map(option => CommandOptionFormatter.format(option)),
            isEmpty: !this.options.hasItems()
        };
    }

    public addOption = (option: CommandOption) => {
        this.options.addItems([option]);
    };

    public removeOption = (value: string) => {
        this.options.removeItems(option => option.value === value);
    };

    public resetOptions = () => {
        this.options.clear();
    };
}
