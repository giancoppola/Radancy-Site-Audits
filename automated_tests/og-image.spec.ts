import {driver, MochaCleanup, MochaSetup} from "../automated_test_setup/_global-setup";
import {By, WebElement} from "selenium-webdriver";
import {expect} from 'chai';
import fs from "fs";
import path from "node:path";
import {iTagsTestResults} from "../automated_test_setup/_types";
import addContext from "mochawesome/addContext";

let linksToTest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'automated_test_setup', 'links_to_test.json'), 'utf8'));
describe("OG Image Test", () => {
    before(async () => {
        await MochaSetup();
    })
    after(async () => {
        await MochaCleanup();
    })
    describe("each page on site should have one og:image tag on each page, and should contain content", () => {
        for (let link of linksToTest) {
            it(link, async function() {
                const selector = 'meta[property="og:image"]';
                await driver.get(link);
                let ogImageTags: WebElement[] = await driver.findElements(By.css(selector));
                let values: string[] = [];
                for(let tag of ogImageTags) {
                    let value = await tag.getAttribute("content");
                    value ? values.push(value) : null;
                }
                const testResultContext: iTagsTestResults = {
                    title: "each page on site should have one og:image tag on each page, and should contain content",
                    value: {
                        url: link,
                        tagTested: selector,
                        noOfTags: ogImageTags.length,
                        tagValues: values
                    }
                }
                addContext(this, testResultContext);
                expect(ogImageTags, "No og:image tag").not.to.be.null;
                expect(ogImageTags.length, "No og:image tag").to.be.greaterThan(0);
                expect(ogImageTags.length, "Too many og:image tags").to.be.lessThan(2);
                expect(values, "No og:image tag value").not.to.be.null;
                expect(values.length, "No og:image tag value").to.be.greaterThan(0);
            })
        }
    })
})



