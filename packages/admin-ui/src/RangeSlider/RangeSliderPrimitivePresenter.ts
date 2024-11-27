import { makeAutoObservable } from "mobx";
import omit from "lodash/omit";
import {
    RangeSliderPrimitiveProps,
    RangeSliderPrimitiveThumbsVm,
    RangeSliderPrimitiveVm
} from "./RangeSliderPrimitive";

interface IRangeSliderPrimitivePresenter<
    TProps extends RangeSliderPrimitiveProps = RangeSliderPrimitiveProps
> {
    get vm(): {
        sliderVm: RangeSliderPrimitiveVm;
        thumbsVm: RangeSliderPrimitiveThumbsVm;
    };
    init: (props: TProps) => void;
    changeValues: (values: number[]) => void;
    commitValues: (values: number[]) => void;
}

class RangeSliderPrimitivePresenter implements IRangeSliderPrimitivePresenter {
    private props?: RangeSliderPrimitiveProps;
    private showTooltip: boolean;

    constructor() {
        this.props = undefined;
        this.showTooltip = false;
        makeAutoObservable(this);
    }

    init(props: RangeSliderPrimitiveProps) {
        this.props = props;
    }

    get vm() {
        return {
            sliderVm: {
                ...omit(this.props, [
                    "showTooltip",
                    "tooltipSide",
                    "transformValues",
                    "onValuesChange",
                    "onValuesCommit",
                    "values"
                ]),
                min: this.min,
                max: this.max,
                values: this.values
            },
            thumbsVm: {
                values: this.transformToLabelValues(this.values),
                showTooltip: this.showTooltip,
                tooltipSide: this.props?.tooltipSide
            }
        };
    }

    public changeValues = (values: number[]) => {
        this.showTooltip = !!this.props?.showTooltip;
        this.props?.onValuesChange?.(values);
    };

    public commitValues = (values: number[]) => {
        this.showTooltip = false;
        this.props?.onValuesCommit?.(values);
    };

    private get min() {
        return this.props?.min ?? 0;
    }

    private get max() {
        return this.props?.max ?? 100;
    }

    private get values() {
        return this.props?.values ?? [this.min, this.max];
    }

    private transformToLabelValues(values: number[]) {
        return values.map(value =>
            this.props?.transformValues ? this.props.transformValues(value) : String(value)
        );
    }
}

export { RangeSliderPrimitivePresenter, type IRangeSliderPrimitivePresenter };
