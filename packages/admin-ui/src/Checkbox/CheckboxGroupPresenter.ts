import { makeAutoObservable } from "mobx";
import { CheckboxGroupProps, CheckboxGroupVm } from "./CheckboxGroup";
import { CheckboxItem } from "./CheckboxItem";
import { CheckboxItemMapper } from "./CheckboxItemMapper";
import { CheckboxItemDto } from "~/Checkbox/CheckboxItemDto";

interface ICheckboxGroupPresenter<TProps extends CheckboxGroupProps = CheckboxGroupProps> {
    vm: CheckboxGroupVm;
    init: (props: TProps) => void;
    changeChecked: (checked: boolean) => void;
}

class CheckboxGroupPresenter implements ICheckboxGroupPresenter {
    private props?: CheckboxGroupProps;
    private items: CheckboxItem[] = [];

    constructor() {
        this.props = undefined;
        makeAutoObservable(this);
    }

    public init(props: CheckboxGroupProps): void {
        this.props = props;
        this.items = this.getItems(props.items, props.values);
    }

    get vm(): CheckboxGroupVm {
        return {
            items: this.items.map(item => CheckboxItemMapper.toFormatted(item))
        };
    }

    public changeChecked = (value: unknown) => {
        if (!this.props?.items) {
            return;
        }

        const currentValues = Array.isArray(this.props?.values ?? [])
            ? [...(this.props?.values ?? [])]
            : [];

        const newValues = this.updateValues(currentValues, value);
        this.items = this.getItems(this.props.items, newValues);
        this.props?.onCheckedChange(newValues);
    };

    private updateValues(currentValues: unknown[], value: unknown): unknown[] {
        const index = currentValues.indexOf(value);

        if (index > -1) {
            return [...currentValues.slice(0, index), ...currentValues.slice(index + 1)];
        }

        return [...currentValues, value];
    }

    private getItems(items?: CheckboxItemDto[], values?: unknown[]): CheckboxItem[] {
        if (!items?.length || !Array.isArray(values)) {
            return [];
        }

        return items.map(item =>
            CheckboxItem.create({
                ...item,
                checked: values.includes(item.value)
            })
        );
    }
}

export { CheckboxGroupPresenter, type ICheckboxGroupPresenter };
