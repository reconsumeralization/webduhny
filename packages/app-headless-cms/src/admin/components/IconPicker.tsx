import React, { useMemo } from "react";
import {
    IconPickerIconDto,
    IconPicker as AdminIconPicker,
    IconPickerProps
} from "@webiny/admin-ui";
import { plugins } from "@webiny/plugins";
import { CmsIconsPlugin } from "~/types";

export const IconPicker = (props: Omit<IconPickerProps, "icons">) => {
    const icons: IconPickerIconDto[] = useMemo(() => {
        const iconPlugins = plugins.byType<CmsIconsPlugin>("cms-icons");
        return iconPlugins.reduce((icons: Array<IconPickerIconDto>, pl) => {
            return icons.concat(pl.getIcons());
        }, []);
    }, []);

    return <AdminIconPicker size={"lg"} icons={icons} {...props} />;
};
