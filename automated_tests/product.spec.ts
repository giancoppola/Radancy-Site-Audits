import {driver, MochaCleanup, MochaSetup} from "../automated_test_setup/_global-setup";
import {By, WebElement} from "selenium-webdriver";
import {expect} from 'chai';
import fs from "fs";
import path from "node:path";
import {
    iDoesElementExistTestResults,
    iImageAltTestResults,
    iImageOptimisationResults,
    iPNGTestResults,
    iHasTagTestResults, iHasTagAndContentLoadsTestResults, iPageLoadSpeedTestResults
} from "../automated_test_setup/_types";
import {websiteToTest} from "../automated_test_setup/_test-parameters";
import {NoSuchElementError} from "selenium-webdriver/lib/error";
const addContext = require('mochawesome/addContext');

let linksToTest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'automated_test_setup', 'links_to_test.json'), 'utf8'));
describe("Product Test", () => {
    before(async () => {
        await MochaSetup();
    })
    after(async () => {
        await MochaCleanup();
    })
    describe("GDPR MagicBullet banner should no longer be in use", function() {
        it(websiteToTest, async function() {
            const selector = 'div#gdpr-alert';
            await driver.manage().deleteAllCookies();
            await driver.get(websiteToTest);
            let deprecatedGdprBanner = false;
            try {
                const el: WebElement = await driver.findElement(By.css(selector));
                if (el) {
                    deprecatedGdprBanner = true;
                }
            }
            catch (e) {
                if ((e as Error).name === "NoSuchElementError"){
                    deprecatedGdprBanner = false;
                }
            }
            const testResultContext: iDoesElementExistTestResults = {
                title: "GDPR MagicBullet banner should no longer be in use",
                value: {
                    url: websiteToTest,
                    selectorTested: selector,
                    doesElementExist: deprecatedGdprBanner
                }
            }
            addContext(this, testResultContext);
            expect(deprecatedGdprBanner, "The site is using the deprecated GDPR MagicBullet banner").to.be.false;
        })
    })
})



