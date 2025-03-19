export const imagePlugins = [
    ".jpg",
    ".jpeg",
    ".tif",
    ".gif",
    ".png",
    ".svg",
    ".webp",
    "bmp",
    "svg"
];

export const getSupportedExtensionsLabelHint = (imagesOnly?: boolean) => {
    return imagesOnly
        ? `Supported files extensions: ${imagePlugins.filter(Boolean).join(", ")}.`
        : null;
};
