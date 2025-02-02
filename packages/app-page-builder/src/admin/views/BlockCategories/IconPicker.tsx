import React, { useMemo } from "react";
import { IconDto, IconPicker as AdminIconPicker, IconPickerProps } from "@webiny/admin-ui";
import { plugins } from "@webiny/plugins";
import { PbIconsPlugin } from "~/types";

const IconPicker = (props: Omit<IconPickerProps, "icons">) => {
    const icons: IconDto[] = useMemo(() => {
        const iconPlugins = plugins.byType<PbIconsPlugin>("pb-icons");
        return iconPlugins.reduce((icons: Array<IconDto>, pl) => {
            return icons.concat(pl.getIcons());
        }, []);
    }, []);

    return <AdminIconPicker size={"lg"} icons={icons} {...props} />;
};

export default IconPicker;
