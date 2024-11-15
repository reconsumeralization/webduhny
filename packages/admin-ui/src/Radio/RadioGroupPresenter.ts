import { makeAutoObservable } from "mobx";
import { RadioGroupProps, RadioGroupVm } from "./Radio";
import omit from "lodash/omit";
import { RadioItem } from "~/Radio/RadioItem";
import { RadioItemMapper } from "~/Radio/RadioItemMapper";

interface IRadioGroupPresenter<TProps extends RadioGroupProps = RadioGroupProps> {
    vm: RadioGroupVm;
    init: (props: TProps) => void;
    changeValue: (value: string) => void;
}

class RadioGroupPresenter implements IRadioGroupPresenter {
    private props?: RadioGroupProps;

    constructor() {
        this.props = undefined;
        makeAutoObservable(this);
    }

    init(props: RadioGroupProps) {
        this.props = props;
    }

    get vm() {
        return {
            ...omit(this.props, ["items", "onValueChange"]),
            items: this.items.map(item => RadioItemMapper.toFormatted(item))
        };
    }

    changeValue(value: string) {
        this.props?.onValueChange?.(value);
    }

    private get items() {
        if (!this.props?.items) {
            return [];
        }

        return this.props.items.map(item => RadioItem.create(item));
    }
}

export { RadioGroupPresenter, type IRadioGroupPresenter };
