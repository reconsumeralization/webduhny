import { CheckboxFormatted } from "./CheckboxFormatted";
import { CheckboxItem } from "./CheckboxItem";

export class CheckboxItemMapper {
    static toFormatted(item: CheckboxItem): CheckboxFormatted {
        return {
            id: item.id,
            label: item.label,
            checked: item.checked,
            indeterminate: item.indeterminate,
            disabled: item.disabled
        };
    }
}
