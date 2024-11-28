import { SliderPrimitivePresenter } from "./SliderPrimitivePresenter";

describe("SliderPrimitivePresenter", () => {
    const onValueChange = jest.fn();
    const presenter = new SliderPrimitivePresenter();

    it("should return the compatible `vm` based on params", () => {
        // `value`
        {
            presenter.init({ onValueChange, value: 50 });
            expect(presenter.vm.value).toEqual([50]);
            expect(presenter.vm.thumbValue).toEqual("50");
        }

        // `min`
        {
            presenter.init({ onValueChange, min: 25 });
            expect(presenter.vm.min).toEqual(25);
            expect(presenter.vm.thumbValue).toEqual(undefined);
        }

        {
            // default: no optional params
            presenter.init({ onValueChange });
            expect(presenter.vm.value).toEqual(undefined);
            expect(presenter.vm.min).toEqual(0); // `min` should default to 0
            expect(presenter.vm.thumbValue).toEqual(undefined);
            expect(presenter.vm.showTooltip).toEqual(false);
        }
    });

    it("should use default `min` if `value` and `defaultValue` are both undefined", () => {
        const presenter = new SliderPrimitivePresenter();
        presenter.init({ onValueChange });
        expect(presenter.vm.thumbValue).toEqual(undefined); // `min` should default to 0
    });

    it("should apply `transformValue` function if provided", () => {
        const transformValue = (value: number) => `${value} units`;
        const presenter = new SliderPrimitivePresenter();
        presenter.init({ onValueChange, value: 30, transformValue });
        expect(presenter.vm.thumbValue).toEqual("30 units");
    });

    it("should fall back to `value` as a string if `transformValue` is undefined", () => {
        const presenter = new SliderPrimitivePresenter();
        presenter.init({ onValueChange, value: 45 });
        expect(presenter.vm.thumbValue).toEqual("45");
    });

    it("should call `onValueChange` callback when `changeValue` is called", () => {
        const presenter = new SliderPrimitivePresenter();
        presenter.init({ onValueChange, value: 20 });
        presenter.changeValue([40]);
        expect(onValueChange).toHaveBeenCalledWith(40);
    });

    it("should call `onValueCommit` callback when `commitValue` is called", () => {
        const onValueCommit = jest.fn();
        const presenter = new SliderPrimitivePresenter();
        presenter.init({ onValueChange, value: 20, onValueCommit });
        presenter.commitValue([40]);
        expect(onValueCommit).toHaveBeenCalledWith(40);
    });

    it("should handle negative values correctly", () => {
        const presenter = new SliderPrimitivePresenter();
        presenter.init({ onValueChange, value: -10 });
        expect(presenter.vm.value).toEqual([-10]);
        expect(presenter.vm.thumbValue).toEqual("-10");
    });

    it("should toggle `showTooltip` based on actions", () => {
        const presenter = new SliderPrimitivePresenter();
        presenter.init({ onValueChange, showTooltip: true });

        presenter.changeValue([30]);
        expect(presenter.vm.showTooltip).toBeTruthy();

        presenter.commitValue([30]);
        expect(presenter.vm.showTooltip).toBeFalsy();
    });
});
