import { IconPickerIcon } from "./IconPickerIcon";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { IconPickerFontAwesome } from "./IconPickerFontAwesome";

export class IconPickerIconFormatter {
    static formatFontAwesome(icon: IconPickerIcon): IconPickerFontAwesome {
        return {
            prefix: icon.prefix as IconPrefix,
            name: icon.name as IconName
        };
    }

    static formatStringValue(icon: IconPickerIcon | IconPickerFontAwesome) {
        return `${icon.prefix}/${icon.name}`;
    }
}
