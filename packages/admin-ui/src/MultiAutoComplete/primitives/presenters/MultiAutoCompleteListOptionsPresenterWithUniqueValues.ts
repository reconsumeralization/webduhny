import { CommandOption } from "~/Command/domain/CommandOption";
import {
    IMultiAutoCompleteListOptionsPresenter,
    IMultiAutoCompleteListOptionsPresenterParams
} from "./MultiAutoCompleteListOptionsPresenter";

export class MultiAutoCompleteListOptionsPresenterWithUniqueValues
    implements IMultiAutoCompleteListOptionsPresenter
{
    private decoretee: IMultiAutoCompleteListOptionsPresenter;

    constructor(decoretee: IMultiAutoCompleteListOptionsPresenter) {
        this.decoretee = decoretee;
    }

    init(params: IMultiAutoCompleteListOptionsPresenterParams) {
        const options = params.options?.filter(option => !option.selected);
        this.decoretee.init({
            ...params,
            options
        });
    }

    get vm() {
        return this.decoretee.vm;
    }

    setListOpenState = (open: boolean) => {
        this.decoretee.setListOpenState(open);
    };

    setSelectedOption = (value: string) => {
        this.decoretee.setSelectedOption(value);
    };

    removeSelectedOption = (value: string) => {
        this.decoretee.removeSelectedOption(value);
    };

    resetSelectedOptions = () => {
        this.decoretee.resetSelectedOptions();
    };

    addOption = (option: CommandOption) => {
        this.decoretee.addOption(option);
    };
}
