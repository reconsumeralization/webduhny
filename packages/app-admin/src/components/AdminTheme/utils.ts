// @ts-nocheck as this file is not used in the project
import parseColor, { type ColorFormats } from "tinycolor2";
import { SHADES_LEVELS } from "./consts";
import { ShadeLevel, ColorPalette, ColorsObject } from "./types";

const colorStringToHsla = (color: string) => {
    return parseColor(color).toHsl();
};

const hslaToString = (color?: ColorFormats.HSLA) => {
    if (!color) {
        return undefined;
    }

    return `${color.h}, ${color.s * 100}%, ${color.l * 100}%`;
};

const autoGenerateShades = (hsla: ColorFormats.HSLA): Record<ShadeLevel, ColorFormats.HSLA> => {
    const { h, s, l } = hsla;

    return {
        ["100"]: { h, s, l: l + 0.4, a: 1 },
        ["200"]: { h, s, l: l + 0.3, a: 1 },
        ["300"]: { h, s, l: l + 0.2, a: 1 },
        ["400"]: { h, s, l: l + 0.1, a: 1 },
        ["500"]: { h, s, l, a: 1 },
        ["600"]: { h, s, l: l - 0.1, a: 1 },
        ["700"]: { h, s, l: l - 0.2, a: 1 },
        ["800"]: { h, s, l: l - 0.3, a: 1 },
        ["900"]: { h, s, l: l - 0.4, a: 1 }
    };
};


// const convertShadesObjectValuesToHsla = (color: string) => {

export const assignColorCssVariables = (
    palette: ColorPalette,
    colors: Partial<ColorsObject> = {}
) => {
    const paletteColors = colors[palette];
    if (!paletteColors) {
        return;
    }

    const shades: Record<ShadeLevel, ColorFormats.HSLA> =
        typeof paletteColors === "string"
            ? autoGenerateShades(colorStringToHsla(paletteColors)!)
            : SHADES_LEVELS.reduce((acc, level) => {
                  const color = paletteColors[level];
                  if (color) {
                      acc[level] = colorStringToHsla(color)!;
                  }
                  return acc;
              }, {} as Record<ShadeLevel, ColorFormats.HSLA>);

    const root = document.documentElement;

    for (const shadeLevel in shades) {
        const shade = shades[shadeLevel as ShadeLevel];
        if (shade) {
            const key = `--color-${palette}-${shadeLevel}`;
            const value = hslaToString(shade)!;
            root.style.setProperty(key, value);
        }
    }
};
