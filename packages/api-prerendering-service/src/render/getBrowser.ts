/**
 * Returns a different browser instance depending on the environment.
 */
export const getBrowser = async () => {
    if (process.env["WEBINY_WATCH_LOCAL_INVOCATION"]) {
        const { default: puppeteer } = await import(/* puppeteer */"puppeteer");
        return puppeteer.launch({});
    }

    const { default: chromium } = await import(/* sparticuz-chromium */ "@sparticuz/chromium");
    const { default: puppeteer } = await import(/* puppeteer-core */ "puppeteer-core");

    return puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true
    });
};
