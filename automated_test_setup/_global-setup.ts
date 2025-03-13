import Chrome from "selenium-webdriver/chrome";
import {Browser, Builder, By, ThenableWebDriver} from "selenium-webdriver";
const {getBinaryPaths} = require("selenium-webdriver/common/driverFinder");
const fs = require("fs");

// Selenium WebDriver that will be used in the tests
export let driver: ThenableWebDriver;

// Setup before all tests start
export async function MochaSetup() {

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
}

// Fires after all tests have finished
export async function MochaCleanup() {
    await driver.quit();
}
