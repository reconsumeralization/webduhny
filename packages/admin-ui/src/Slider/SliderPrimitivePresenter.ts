import { makeAutoObservable } from "mobx";
import { SliderPrimitiveVm } from "./SliderPrimitive";

interface SliderPrimitivePresenterParams {
    min?: number;
    onValueChange: (value: number) => void;
    onValueCommit?: (value: number) => void;
    showTooltip?: boolean;
    transformValue?: (value: number) => string;
    value?: number;
}

interface ISliderPrimitivePresenter {
    get vm(): SliderPrimitiveVm;
    init: (params: SliderPrimitivePresenterParams) => void;
    changeValue: (values: number[]) => void;
    commitValue: (values: number[]) => void;
}

class SliderPrimitivePresenter implements ISliderPrimitivePresenter {
    private params?: SliderPrimitivePresenterParams = undefined;
    private showTooltip = false;

    constructor() {
        makeAutoObservable(this);
    }

    init(params: SliderPrimitivePresenterParams) {
        this.params = params;
    }

    get vm() {
        return {
            value: this.value,
            min: this.min,
            thumbValue: this.transformToLabelValue(this.value?.[0]),
            showTooltip: this.showTooltip
        };
    }

    public changeValue = (values: number[]) => {
        const [newValue] = values;
        this.showTooltip = !!this.params?.showTooltip;
        this.params?.onValueChange(newValue);
    };

    public commitValue = (values: number[]) => {
        const [newValue] = values;
        this.showTooltip = false;
        this.params?.onValueCommit?.(newValue);
    };

    private get value() {
        return this.params?.value !== undefined ? [this.params.value] : undefined;
    }

    private get min() {
        return this.params?.min ?? 0;
    }

    private transformToLabelValue(value?: number) {
        if (typeof value === "undefined") {
            return;
        }
        return this.params?.transformValue ? this.params.transformValue(value) : String(value);
    }
}

export {
    SliderPrimitivePresenter,
    type ISliderPrimitivePresenter,
    type SliderPrimitivePresenterParams
};
