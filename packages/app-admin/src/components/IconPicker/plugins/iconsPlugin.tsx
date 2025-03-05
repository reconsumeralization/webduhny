import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { cn, DelayedOnChange } from "@webiny/admin-ui";
import { ColorPicker } from "@webiny/ui/ColorPicker";

import { useIcon } from "..";
import { IconPickerTab } from "../IconPickerTab";
import { useIconPicker } from "../IconPickerPresenterProvider";
import { IconPickerConfig } from "../config";
import { Icon } from "../types";

const ColorPickerWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn([
                "wby-size-xl",
                "[&_[data-role='color-picker-swatch']]:!wby-p-[calc(theme(padding.xs)-theme(borderWidth.sm))] [&_[data-role='color-picker-swatch']]:!wby-rounded-sm",
                "[&_[data-role='color-picker-swatch']>div]:!wby-size-lg"
            ])}
        >
            {props.children}
        </div>
    );
};

/**
 * NOTE: Avoid using `@emotion/styled` in icon renderer components across all plugins.
 * This is crucial for serializing component rendering into a string value as plain HTML,
 * which is necessary for usage in the website application. Please use inline styles here
 * to ensure proper serialization.
 */

interface SimpleIcon extends Icon {
    color: string;
}

const IconSvg = () => {
    const { icon, size } = useIcon<SimpleIcon>();

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${icon.width || 512} 512`}
            color={icon?.color || "inherit"}
            dangerouslySetInnerHTML={{ __html: icon.value || "" }}
            style={{
                verticalAlign: "middle",
                width: "100%",
                height: "100%"
            }}
        />
    );
};

interface IconColorPickerProps {
    color: string;
    onChange: (value: string) => void;
}

const IconColorPicker = ({ color, onChange }: IconColorPickerProps) => {
    return (
        <DelayedOnChange value={color} onChange={onChange}>
            {({ value, onChange }) => (
                <ColorPickerWrapper>
                    <ColorPicker align={"right"} value={value} onChange={onChange} />
                </ColorPickerWrapper>
            )}
        </DelayedOnChange>
    );
};

/**
 * @see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
const isSimpleIcon = (icon: Icon | null): icon is SimpleIcon => {
    if (!icon) {
        return false;
    }
    return icon.type === "icon";
};

const IconTab = observer(() => {
    const presenter = useIconPicker();
    const { selectedIcon } = presenter.vm;

    const [color, setColor] = useState("inherit");

    useEffect(() => {
        if (color === "inherit" && isSimpleIcon(selectedIcon)) {
            setColor(selectedIcon.color);
        }
    }, [selectedIcon]);

    const onColorChange = (color: string) => {
        setColor(color);

        if (isSimpleIcon(selectedIcon)) {
            presenter.setIcon({ ...selectedIcon, color });
        }
    };

    const onIconSelect = (icon: Icon) => {
        // Set icon and assign current color.
        presenter.setIcon({ ...icon, color });
        presenter.closeMenu();
    };

    return (
        <IconPickerTab
            value={"icon"}
            label={"Icons"}
            onChange={onIconSelect}
            cellDecorator={cell => <span style={{ color }}>{cell}</span>}
            actions={<IconColorPicker color={color} onChange={onColorChange} />}
        />
    );
});

export const SimpleIconPlugin = () => {
    return (
        <IconPickerConfig>
            <IconPickerConfig.IconType name={"icon"}>
                <IconPickerConfig.IconType.Icon element={<IconSvg />} />
                <IconPickerConfig.IconType.Tab element={<IconTab />} />
            </IconPickerConfig.IconType>
        </IconPickerConfig>
    );
};
