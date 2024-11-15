import { RadioItemFormatted } from "~/Radio/RadioItemFormatted";
import { RadioItem } from "~/Radio/RadioItem";

export class RadioItemMapper {
    static toFormatted(item: RadioItem): RadioItemFormatted {
        return {
            id: item.id,
            label: item.label,
            value: item.value,
            disabled: item.disabled
        };
    }
}
