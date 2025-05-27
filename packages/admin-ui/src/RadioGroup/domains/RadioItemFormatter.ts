import { RadioItemFormatted } from "./RadioItemFormatted";
import { RadioItem } from "./RadioItem";

export class RadioItemFormatter {
    static format(item: RadioItem): RadioItemFormatted {
        return {
            id: item.id,
            label: item.label,
            value: String(item.value),
            disabled: item.disabled
        };
    }
}
