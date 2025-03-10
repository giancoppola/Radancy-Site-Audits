import Chrome from "selenium-webdriver/chrome";
import {Browser, Builder, By, ThenableWebDriver} from "selenium-webdriver";
import {iTestResults} from "./_types";
import * as path from "node:path";
const {getBinaryPaths} = require("selenium-webdriver/common/driverFinder");
const fs = require("fs");

// Test results object
export let TestResults: iTestResults = {};

// Selenium WebDriver that will be used in the tests
export let driver: ThenableWebDriver;

// Set how long for Jest to wait for each test to complete,
// setting at 5 minutes due to nature of testing
const secondInMilliseconds = 1000;
export const jestTimeout = 300 * secondInMilliseconds;
jest.setTimeout(jestTimeout);

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

}, jestTimeout)

// Fires after all jest tests have finished
afterAll(async () => {
    const resultsDir = path.join(__dirname, '..', 'automated_test_results');
    if (!fs.existsSync(resultsDir)){
        await fs.mkdirSync(resultsDir, { recursive: true });
    }
    await fs.writeFileSync(path.join(resultsDir, 'test_results.json'), JSON.stringify(TestResults, null, "\t"));
    await driver.quit();
}, jestTimeout)
