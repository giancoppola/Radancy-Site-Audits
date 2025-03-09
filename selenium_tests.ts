import {By, ThenableWebDriver} from "selenium-webdriver";
import GetInternalLinks from "./automated_test_modules/_get-internal-links";

const Chrome = require('selenium-webdriver/chrome');
const {Browser, Builder, ThenableWebDriver} = require("selenium-webdriver");
const {getBinaryPaths} = require("selenium-webdriver/common/driverFinder");
const options = new Chrome.Options();

const StartSiteAudit = async (testSiteUrl: string) => {

    let options = new Chrome.Options();
    options.setBrowserVersion("stable")

    let paths = getBinaryPaths(options)
    let driverPath = paths.driverPath;
    let browserPath = paths.browserPath;

    options.setChromeBinaryPath(browserPath)

    let service = new Chrome.ServiceBuilder().setPath(driverPath)

    let driver: ThenableWebDriver = new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .setChromeService(service)
        .build();
    await driver.manage().setTimeouts({implicit: 500});

    await driver.get(testSiteUrl);

    let siteLinks = await driver.findElements(By.css("a"));
    let internalLinks = [...pagesToTest];
    internalLinks = internalLinks.concat(await GetInternalLinks(siteLinks));
    console.log(internalLinks);
    let title = await driver.getTitle();
    console.log(title);
    await driver.quit();

}

// change test site URL in /automated_test_modules/_start-parameters.ts
StartSiteAudit(websiteToTest);