import { makeAutoObservable } from "mobx";
import { CheckboxGroupVm } from "./CheckboxGroup";
import { CheckboxItem } from "./CheckboxItem";
import { CheckboxItemMapper } from "./CheckboxItemMapper";
import { CheckboxItemDto } from "~/Checkbox/CheckboxItemDto";

interface CheckboxGroupPresenterParams<TValue = any> {
    items: CheckboxItemDto<TValue>[];
    values: TValue[];
    onCheckedChange: (values: TValue[]) => void;
}

interface ICheckboxGroupPresenter<
    TParams extends CheckboxGroupPresenterParams = CheckboxGroupPresenterParams
> {
    vm: CheckboxGroupVm;
    init: (props: TParams) => void;
    changeChecked: (checked: boolean) => void;
}

class CheckboxGroupPresenter implements ICheckboxGroupPresenter {
    private params?: CheckboxGroupPresenterParams;
    private items: CheckboxItem[] = [];

    constructor() {
        this.params = undefined;
        makeAutoObservable(this);
    }

    public init(params: CheckboxGroupPresenterParams): void {
        this.params = params;
        this.items = this.getItems(params.items, params.values);
    }

    get vm(): CheckboxGroupVm {
        return {
            items: this.items.map(item => CheckboxItemMapper.toFormatted(item))
        };
    }

    public changeChecked = (value: unknown) => {
        if (!this.params?.items) {
            return;
        }

        const currentValues = Array.isArray(this.params?.values ?? [])
            ? [...(this.params?.values ?? [])]
            : [];

        const newValues = this.updateValues(currentValues, value);
        this.items = this.getItems(this.params.items, newValues);
        this.params?.onCheckedChange(newValues);
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

export { CheckboxGroupPresenter, type ICheckboxGroupPresenter, type CheckboxGroupPresenterParams };
