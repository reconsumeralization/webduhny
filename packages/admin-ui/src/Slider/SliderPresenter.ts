import { makeAutoObservable } from "mobx";
import omit from "lodash/omit";
import { ISliderPrimitivePresenter } from "./SliderPrimitivePresenter";
import { SliderLabelVm, SliderProps } from "./Slider";

interface ISliderPresenter<TProps extends SliderProps = SliderProps>
    extends ISliderPrimitivePresenter<TProps> {
    get vm(): ISliderPrimitivePresenter<TProps>["vm"] & { labelVm: SliderLabelVm };
}

class SliderPresenter implements ISliderPresenter {
    private sliderPresenter: ISliderPrimitivePresenter;
    private props?: SliderProps;

    constructor(sliderPresenter: ISliderPrimitivePresenter) {
        this.sliderPresenter = sliderPresenter;
        this.props = undefined;
        makeAutoObservable(this);
    }

    init(props: SliderProps) {
        this.props = props;
        this.sliderPresenter.init(omit(props, ["label", "labelPosition", "required"]));
    }

    get vm() {
        return {
            sliderVm: {
                ...this.sliderPresenter.vm.sliderVm
            },
            thumbVm: {
                ...this.sliderPresenter.vm.thumbVm
            },
            labelVm: {
                label: this.props?.label ?? "",
                position: this.props?.labelPosition ?? "top",
                required: this.props?.required ?? false,
                value: this.transformToLabelValue(
                    this.sliderPresenter.vm.sliderVm.value?.[0] ??
                        this.sliderPresenter.vm.sliderVm.min
                )
            }
        };
    }

    public changeValue = (values: number[]): void => {
        this.sliderPresenter.changeValue(values);
    };

    public commitValue = (values: number[]): void => {
        this.sliderPresenter.commitValue(values);
    };

    private transformToLabelValue(value: number): string {
        return this.props?.transformValue ? this.props.transformValue(value) : String(value);
    }
}

export { SliderPresenter, type ISliderPresenter };
