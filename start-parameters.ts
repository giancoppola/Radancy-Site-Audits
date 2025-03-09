import Chrome from "selenium-webdriver/chrome";
import {Browser, Builder, By, ThenableWebDriver} from "selenium-webdriver";
const {getBinaryPaths} = require("selenium-webdriver/common/driverFinder");
import GetInternalLinks from "./automated_test_modules/_get-internal-links";

// Careers site you want to test, this should be the homepage of the site
export const websiteToTest: string = "https://careers.questdiagnostics.com/";

// Array of core pages to test, the automated tests will also
// add internal pages linked on the site, but you can add here
// to be certain they will be tested
export const pagesToTest: string[] = [
    "/search-jobs",
    "/sitemap",
];

export let driver: ThenableWebDriver;
// Setup before all jest tests start
beforeAll(async () => {

    let options = new Chrome.Options();
    options.setBrowserVersion("stable")

    let paths = getBinaryPaths(options)
    let driverPath = paths.driverPath;
    let browserPath = paths.browserPath;

    options.setChromeBinaryPath(browserPath)

    let service = new Chrome.ServiceBuilder().setPath(driverPath)

    driver = new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .setChromeService(service)
        .build();

    await driver.manage().setTimeouts({implicit: 500});

}, 50000)
// Fires after all jest tests have finished
afterAll(async () => {
    await driver.quit();
})