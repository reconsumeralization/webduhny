const { fontFamily } = require("tailwindcss/defaultTheme");
const { getProject } = require("@webiny/cli/utils");
const project = getProject();
const webinyPackagesGlob = `${project.root}/node_modules/@webiny/app*/**/*.{js,ts,tsx}`;
const webinyAdminUiPackageGlob = `${project.root}/node_modules/@webiny/admin-ui/**/*.{js,ts,tsx}`;
const webinyUiPackageGlob = `${project.root}/node_modules/@webiny/ui/**/*.{js,ts,tsx}`;
const adminAppSourceGlob = `${project.root}/apps/admin`;

/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: "wby-",
    darkMode: ["class"],
    content: [
        webinyPackagesGlob,
        webinyAdminUiPackageGlob,
        webinyUiPackageGlob,
        adminAppSourceGlob
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
