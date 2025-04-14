import React, { useCallback, useState } from "react";
import { css } from "emotion";
import isEqual from "lodash/isEqual";
import { ChromePicker, ColorState, RGBColor } from "react-color";
import { Menu } from "@webiny/ui/Menu";
import { cn, ColorPicker as AdminUiColorPickerPrimitive, SwitchPrimitive } from "@webiny/admin-ui";
import { usePageElements } from "@webiny/app-page-builder-elements/hooks/usePageElements";
import styled from "@emotion/styled";

const ColorBox = ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div
            {...props}
            className={cn(
                "wby-inline-block wby-rounded-md wby-border-sm wby-border-neutral-dimmed wby-transition-transform wby-duration-200",
                className
            )}
        >
            {children}
        </div>
    );
};

const Color = ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div
            {...props}
            className={cn(
                "wby-cursor-pointer wby-w-xl wby-h-xl wby-rounded-md wby-transition-transform wby-duration-200 wby-flex wby-items-center wby-relative hover:wby-scale-[1.25] wby-after:content-[''] wby-after:box-shadow-[0_0.25rem_0.125rem_0_rgba(0,0,0,0.05)] wby-after:transition-opacity after:wby-duration-[500ms] wby-after:ease-[cubic-bezier(0.165,0.84,0.44,1)] wby-after:absolute wby-after:top-0 wby-after:left-0 wby-after:w-full wby-after:h-full wby-after:opacity-0 wby-hover:after:opacity-100 wby-flex wby-justify-center wby-items-center",
                className
            )}
        >
            {children}
        </div>
    );
};

const TransparentColor = styled(Color)({
    backgroundSize: "10px 10px",
    backgroundImage:
        "linear-gradient( 45deg, #555 25%, transparent 25%, transparent)," +
        "linear-gradient(-45deg, #555 25%, transparent 25%, transparent)," +
        "linear-gradient( 45deg, transparent 75%, #555 75%)," +
        "linear-gradient(-45deg, transparent 75%, #555 75%)"
});

const chromePickerStyles = css({
    width: "100%",
    ".chrome-picker": {
        boxShadow: "none !important",
        width: "100% !important"
    }
});

const ColorPickerMenuLabel = ({
    children,
    className,
    ...props
}: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div
            {...props}
            className={cn(
                "wby-text-sm wby-uppercase wby-text-neutral-strong wby-font-semibold wby-mb-xs wby-flex",
                className
            )}
        >
            {children}
        </div>
    );
};

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
    onChangeComplete: (value: string) => void;
    compact?: boolean;
    handlerClassName?: string;
}

const ColorPicker = ({ value, onChange, onChangeComplete, compact = false }: ColorPickerProps) => {
    const [showPicker, setShowPicker] = useState(true);

    const getColorValue = useCallback((rgb: RGBColor) => {
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    }, []);

    const onColorChange = useCallback(
        (color: ColorState) => {
            onChange(getColorValue(color.rgb));
        },
        [onChange]
    );

    const onColorChangeComplete = useCallback(
        ({ rgb }: ColorState) => {
            onChangeComplete(getColorValue(rgb));
        },
        [onChangeComplete]
    );

    const hidePicker = useCallback(() => {
        setShowPicker(false);
    }, [setShowPicker]);

    const togglePicker = useCallback(() => {
        setShowPicker(prev => !prev);
    }, [setShowPicker]);

    const pageElements = usePageElements();

    const themeColors: Record<string, any> = {};

    const colors = pageElements.theme?.styles?.colors;
    if (colors) {
        for (const key in colors) {
            if (colors[key]) {
                themeColors[key] = colors[key];
            }
        }
    }

    // Either a custom color or a color coming from the theme object.
    const actualSelectedColor = themeColors[value] || value || "#fff";

    const colorPicker = (
        <div className={"wby-gap-sm-plus wby-px-sm"}>
            <ColorPickerMenuLabel>Theme Colors</ColorPickerMenuLabel>
            <div className={"wby-flex wby-flex-wrap wby-gap-xs-plus wby-mb-md"}>
                {Object.keys(themeColors).map((key, index) => {
                    const color = themeColors[key];
                    if (color === value || value === "transparent") {
                        // themeColor = true;
                    }

                    return (
                        <ColorBox key={index}>
                            <Color
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    hidePicker();

                                    // With page elements implementation, we want to store the color key and
                                    // then the actual color will be retrieved from the theme object.
                                    onChangeComplete(key);
                                }}
                            />
                        </ColorBox>
                    );
                })}
                <ColorBox>
                    <TransparentColor
                        onClick={() => {
                            hidePicker();
                            onChangeComplete("transparent");
                        }}
                    />
                </ColorBox>
            </div>

            <ColorPickerMenuLabel className={"wby-justify-between wby-items-center"}>
                Custom Color
                <SwitchPrimitive
                    checked={showPicker}
                    onChange={togglePicker}
                    label={""}
                />
            </ColorPickerMenuLabel>

            {showPicker && (
                <span onClick={e => e.stopPropagation()} className={chromePickerStyles}>
                    <ChromePicker
                        color={actualSelectedColor}
                        onChange={onColorChange}
                        onChangeComplete={onColorChangeComplete}
                    />
                </span>
            )}
        </div>
    );

    if (compact) {
        return (
            <div className={"wby-flex wby-justify-end"}>
                <Menu
                    anchor={"bottomLeft"}
                    handle={<AdminUiColorPickerPrimitive value={actualSelectedColor} />}
                >
                    <div className={"wby-flex wby-max-w-[210px] wby-pt-xs"}>{colorPicker}</div>
                </Menu>
            </div>
        );
    }

    return colorPicker;
};

export default React.memo(ColorPicker, isEqual);
