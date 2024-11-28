import { SliderPresenter } from "./SliderPresenter";
import { SliderPrimitivePresenter } from "./SliderPrimitivePresenter";

describe("SliderPresenter", () => {
    const onValueChange = jest.fn();
    const primitivePresenter = new SliderPrimitivePresenter();
    const presenter = new SliderPresenter(primitivePresenter);

    it("should return the compatible `vm` based on params", () => {
        // `value`
        {
            presenter.init({ onValueChange, value: 50 });
            expect(presenter.vm.value).toEqual([50]);
            expect(presenter.vm.thumbValue).toEqual("50");
            expect(presenter.vm.labelValue).toEqual("50");
        }

        // `min`
        {
            presenter.init({ onValueChange, min: 25 });
            expect(presenter.vm.min).toEqual(25);
            expect(presenter.vm.thumbValue).toEqual(undefined);
            expect(presenter.vm.labelValue).toEqual("25");
        }

        {
            // default
            presenter.init({ onValueChange });
            expect(presenter.vm.value).toEqual(undefined);
            expect(presenter.vm.min).toEqual(0);
            expect(presenter.vm.thumbValue).toEqual(undefined);
            expect(presenter.vm.showTooltip).toEqual(false);
            expect(presenter.vm.labelValue).toEqual("0");
        }
    });

    it("should apply the `transformValue` function if provided", () => {
        const transformValue = (value: number) => `${value} units`;
        presenter.init({ value: 30, onValueChange, transformValue });
        expect(presenter.vm.labelValue).toEqual("30 units");
    });

    it("should fall back to `value` as a string if `transformValue` is undefined", () => {
        presenter.init({ value: 45, onValueChange });
        expect(presenter.vm.labelValue).toEqual("45");
    });

    it("should call `onValueChange` callback when `changeValue` is called", () => {
        presenter.init({ value: 20, onValueChange });
        presenter.changeValue([40]);
        expect(onValueChange).toHaveBeenCalledWith(40);
    });

    it("should call `onValueCommit` callback when `commitValue` is called", () => {
        const onValueCommit = jest.fn();
        presenter.init({ value: 20, onValueChange, onValueCommit });
        presenter.commitValue([40]);
        expect(onValueCommit).toHaveBeenCalledWith(40);
    });

    it("should handle negative values correctly", () => {
        presenter.init({ value: -10, onValueChange });
        expect(presenter.vm.labelValue).toEqual("-10");
    });
});
