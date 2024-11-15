import { RadioItemDto } from "./RadioItemDto";
import { generateId } from "~/utils";

export class RadioItem {
    private readonly _id: string;
    private readonly _label: string;
    private readonly _value: string;
    private readonly _disabled: boolean;

    protected constructor(data: { id: string; label: string; value: string; disabled: boolean }) {
        this._id = data.id;
        this._label = data.label;
        this._value = data.value;
        this._disabled = data.disabled;
    }

    static create(data: RadioItemDto) {
        return new RadioItem({
            id: generateId(data.id),
            label: data.label,
            value: data.value,
            disabled: data.disabled ?? false
        });
    }

    get id() {
        return this._id;
    }

    get label() {
        return this._label;
    }

    get value() {
        return this._value;
    }

    get disabled() {
        return this._disabled;
    }
}
