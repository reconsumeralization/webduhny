/**
 * Returns a different browser instance depending on the environment.
 */
export const getBrowser = async () => {
    if (process.env["WEBINY_WATCH_LOCAL_INVOCATION"]) {
        const { default: puppeteer } = await import(
            /* webpackChunkName: "puppeteer" */ "puppeteer"
        );
        return puppeteer.launch({});
    }

    const { default: chromium } = await import(
        /* webpackChunkName: "sparticuz-chromium" */ "@sparticuz/chromium"
    );
    const { default: puppeteer } = await import(
        /* webpackChunkName: "puppeteer-core" */ "puppeteer-core"
    );

    return puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true
    });
};
