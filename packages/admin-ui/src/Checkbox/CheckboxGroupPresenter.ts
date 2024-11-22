import { makeAutoObservable } from "mobx";
import { CheckboxGroupVm } from "./CheckboxGroup";
import { CheckboxItem } from "./CheckboxItem";
import { CheckboxItemMapper } from "./CheckboxItemMapper";
import { CheckboxItemDto } from "./CheckboxItemDto";

interface CheckboxGroupPresenterParams<TValue extends string | number = string> {
    items: CheckboxItemDto<TValue>[];
    values: TValue[];
    onCheckedChange: (values: TValue[]) => void;
}

interface ICheckboxGroupPresenter<TValue extends string | number = string> {
    vm: CheckboxGroupVm;
    init: (params: CheckboxGroupPresenterParams<TValue>) => void;
    changeChecked: (value: TValue) => void;
}

class CheckboxGroupPresenter<TValue extends string | number = string>
    implements ICheckboxGroupPresenter<TValue>
{
    private params?: CheckboxGroupPresenterParams<TValue>;
    private items: CheckboxItem<TValue>[] = [];

    constructor() {
        this.params = undefined;
        makeAutoObservable(this);
    }

    public init(params: CheckboxGroupPresenterParams<TValue>) {
        this.params = params;
        this.items = this.getItems(params.items, params.values);
    }

    get vm(): CheckboxGroupVm {
        return {
            items: this.items.map(item => CheckboxItemMapper.toFormatted(item))
        };
    }

    public changeChecked = (value: TValue) => {
        if (!this.params?.items) {
            return;
        }

        const currentValues = [...this.params.values];
        const newValues = this.updateValues(currentValues, value);
        this.items = this.getItems(this.params.items, newValues);
        this.params.onCheckedChange(newValues);
    };

    private updateValues(currentValues: TValue[], value: TValue): TValue[] {
        const index = currentValues.indexOf(value);

        if (index > -1) {
            return [...currentValues.slice(0, index), ...currentValues.slice(index + 1)];
        }

        return [...currentValues, value];
    }

    private getItems(items: CheckboxItemDto<TValue>[], values: TValue[]): CheckboxItem<TValue>[] {
        if (!items.length) {
            return [];
        }

        return items.map(item =>
            CheckboxItem.create({
                ...item,
                checked: values.some(value => value === item.value)
            })
        );
    }
}

export { CheckboxGroupPresenter, type ICheckboxGroupPresenter, type CheckboxGroupPresenterParams };
