const { fontFamily } = require("tailwindcss/defaultTheme");
const webinyPackagesGlob = `src/**/*.{js,ts,tsx}`;

/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: "wby-",
    darkMode: ["class"],
    content: [
        webinyPackagesGlob,
    ],
    theme: {
        container: {
            center: true,
            screens: {
                "2xl": "1200px",
                xl: "1200px"
            }
        },

        fontFamily: {
            sans: ["var(--font-sans)", ...fontFamily.sans],
            serif: ["var(--font-serif)", ...fontFamily.serif],
            mono: ["var(--font-mono)", ...fontFamily.mono]
        },

    },

    plugins: [require("tailwindcss-animate")]
};
