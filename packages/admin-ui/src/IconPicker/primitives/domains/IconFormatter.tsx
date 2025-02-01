import { Icon } from "./Icon";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { IconFormattedFontAwesome } from "./IconFormattedFontAwesome";

export class IconFormatter {
    static formatFontAwesome(icon: Icon): IconFormattedFontAwesome {
        return {
            prefix: icon.prefix as IconPrefix,
            name: icon.name as IconName
        };
    }

    static formatStringValue(icon: Icon | IconFormattedFontAwesome) {
        return `${icon.prefix}/${icon.name}`;
    }
}
