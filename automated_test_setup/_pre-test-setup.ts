import path from "node:path";
import fs from "fs";
import Chrome from "selenium-webdriver/chrome";
import {Browser, Builder} from "selenium-webdriver";
import GetInternalLinks from "../automated_test_modules/_get-internal-links";
const {getBinaryPaths} = require("selenium-webdriver/common/driverFinder");

// Runs before the actual tests run, currently this is to
// build a list of links that we want to test
const PreTestSetup = async () => {
    console.log("PTS: Running pre test setup steps");
    try {
        const setupDir = path.join(__dirname, '..', 'automated_test_setup');
        if (!fs.existsSync(setupDir)){
            await fs.mkdirSync(setupDir, { recursive: true });
        }

        let options = new Chrome.Options();
        options.setBrowserVersion("stable")

        let paths = getBinaryPaths(options)
        let driverPath = paths.driverPath;
        let browserPath = paths.browserPath;

        options.setChromeBinaryPath(browserPath)

        let service = new Chrome.ServiceBuilder().setPath(driverPath)

        let driver = new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(options)
            .setChromeService(service)
            .build();

        await driver.manage().setTimeouts({implicit: 500});

        let linksToTest = await GetInternalLinks(driver);
        fs.writeFileSync(path.join(setupDir, 'links_to_test.json'), JSON.stringify(linksToTest));
        await driver.quit();
        console.log("PTS: Successfully completed pre test setup steps");
    }
    catch (e) {
        console.log(`PTS: Error in pre test setup steps - ${(e as Error).message}`);
    }
    console.log("PTS: Now starting tests")
}
PreTestSetup();


