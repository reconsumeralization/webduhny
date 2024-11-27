import { makeAutoObservable } from "mobx";
import { IRangeSliderPrimitivePresenter } from "./RangeSliderPrimitivePresenter";
import { RangeSliderLabelVm, RangeSliderProps } from "./RangeSlider";

interface IRangeSliderPresenter<TProps extends RangeSliderProps = RangeSliderProps>
    extends IRangeSliderPrimitivePresenter<TProps> {
    get vm(): IRangeSliderPrimitivePresenter<TProps>["vm"] & { labelVm: RangeSliderLabelVm };
}

class RangeSliderPresenter implements IRangeSliderPresenter {
    private rangeSliderPresenter: IRangeSliderPrimitivePresenter;
    private props?: RangeSliderProps;

    constructor(rangeSliderPresenter: IRangeSliderPrimitivePresenter) {
        this.rangeSliderPresenter = rangeSliderPresenter;
        this.props = undefined;
        makeAutoObservable(this);
    }

    init(props: RangeSliderProps) {
        this.props = props;
        this.rangeSliderPresenter.init(props);
    }

    get vm() {
        return {
            sliderVm: {
                ...this.rangeSliderPresenter.vm.sliderVm
            },
            thumbsVm: {
                ...this.rangeSliderPresenter.vm.thumbsVm
            },
            labelVm: {
                label: this.props?.label ?? "",
                values: this.transformToLabelValues(this.rangeSliderPresenter.vm.sliderVm.values)
            }
        };
    }

    public changeValues = (values: number[]): void => {
        this.rangeSliderPresenter.changeValues(values);
    };

    public commitValues = (values: number[]): void => {
        this.rangeSliderPresenter.commitValues(values);
    };

    private transformToLabelValues(values: number[]) {
        return values.map(value =>
            this.props?.transformValues ? this.props.transformValues(value) : String(value)
        );
    }
}

export { RangeSliderPresenter };
