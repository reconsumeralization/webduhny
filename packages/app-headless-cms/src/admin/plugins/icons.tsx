import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { IconPrefix } from "@fortawesome/fontawesome-common-types";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { IconPickerIconDto } from "@webiny/admin-ui";
import { CmsIconsPlugin } from "~/types";

const icons: IconPickerIconDto[] = [];

interface Icons {
    definitions: Record<IconPrefix, Record<IconName, string[]>>;
}

const plugin: CmsIconsPlugin = {
    name: "cms-icons-fontawesome",
    type: "cms-icons",
    init() {
        /**
         * Ignoring TS errors. We know what we did here is good, but cannot get it to work with typescript.
         */
        // @ts-expect-error
        library.add(fab, fas, far);
        const definitions = (library as unknown as Icons).definitions;
        // @ts-expect-error
        Object.keys(definitions).forEach((pack: IconPrefix) => {
            const defs = definitions[pack];
            // @ts-expect-error
            Object.keys(defs).forEach((icon: IconName) => {
                icons.push({
                    prefix: pack,
                    name: icon
                });
            });
        });
    },
    getIcons() {
        return icons;
    }
};

export default plugin;
