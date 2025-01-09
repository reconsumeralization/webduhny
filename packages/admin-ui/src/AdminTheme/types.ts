import { COLOR_PALLETS, SHADES_LEVELS } from "./consts";

export type ColorPalette = (typeof COLOR_PALLETS)[number];
export type ShadeLevel = (typeof SHADES_LEVELS)[number];
export type ShadesObject = Record<ShadeLevel, string>;

export type ColorsObject = Record<ColorPalette, string | ShadesObject>;
