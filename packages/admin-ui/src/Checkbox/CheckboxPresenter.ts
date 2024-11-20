import { makeAutoObservable } from "mobx";
import { CheckboxProps, CheckboxVm } from "./Checkbox";
import { CheckboxItem } from "./CheckboxItem";
import { CheckboxItemMapper } from "./CheckboxItemMapper";

interface ICheckboxPresenter<TProps extends CheckboxProps = CheckboxProps> {
    vm: CheckboxVm;
    init: (props: TProps) => void;
    changeChecked: (checked: boolean) => void;
}

export class CheckboxPresenter implements ICheckboxPresenter {
    private props?: CheckboxProps;
    private item?: CheckboxItem;

    constructor() {
        this.props = undefined;
        this.item = undefined;
        makeAutoObservable(this);
    }

    public init = (props: CheckboxProps) => {
        this.props = props;
        this.item = CheckboxItem.create({
            id: props.id,
            label: props.label,
            checked: props.checked,
            indeterminate: props.indeterminate,
            disabled: props.disabled
        });
    };

    get vm() {
        return {
            item: this.item ? CheckboxItemMapper.toFormatted(this.item) : undefined
        };
    }

    public changeChecked = (checked: boolean) => {
        this.props?.onCheckedChange(checked);
    };
}
