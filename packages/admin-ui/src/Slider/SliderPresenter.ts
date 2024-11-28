import { makeAutoObservable } from "mobx";
import {
    ISliderPrimitivePresenter,
    SliderPrimitivePresenterParams
} from "./SliderPrimitivePresenter";

type SliderPresenterParams = SliderPrimitivePresenterParams;

interface ISliderPresenter extends ISliderPrimitivePresenter {
    get vm(): ISliderPrimitivePresenter["vm"] & { labelValue: string };
}

class SliderPresenter implements ISliderPresenter {
    private sliderPrimitivePresenter: ISliderPrimitivePresenter;
    private params?: SliderPresenterParams = undefined;

    constructor(sliderPresenter: ISliderPrimitivePresenter) {
        this.sliderPrimitivePresenter = sliderPresenter;
        makeAutoObservable(this);
    }

    init(params: SliderPresenterParams) {
        this.params = params;
        this.sliderPrimitivePresenter.init({
            min: params.min,
            onValueChange: params.onValueChange,
            onValueCommit: params.onValueCommit,
            showTooltip: params.showTooltip,
            transformValue: params.transformValue,
            value: params.value
        });
    }

    get vm() {
        return {
            ...this.sliderPrimitivePresenter.vm,
            labelValue: this.transformToLabelValue(
                this.sliderPrimitivePresenter.vm.value?.[0] ?? this.sliderPrimitivePresenter.vm.min
            )
        };
    }

    public changeValue = (values: number[]): void => {
        this.sliderPrimitivePresenter.changeValue(values);
    };

    public commitValue = (values: number[]): void => {
        this.sliderPrimitivePresenter.commitValue(values);
    };

    private transformToLabelValue(value: number): string {
        return this.params?.transformValue ? this.params.transformValue(value) : String(value);
    }
}

export { SliderPresenter, type ISliderPresenter, type SliderPresenterParams };
