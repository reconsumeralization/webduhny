import { COLOR_KEYS, COLOR_PALLETS, SHADES_LEVELS } from "./consts";

export type ColorKeys = (typeof COLOR_KEYS)[number];
export type ColorPalette = (typeof COLOR_PALLETS)[number];
export type ShadeLevel = (typeof SHADES_LEVELS)[number];

export type ColorsObject = Record<ColorKeys, string>;