import {driver, MochaCleanup, MochaSetup} from "../automated_test_setup/_global-setup";
import {By, WebElement} from "selenium-webdriver";
import {expect} from 'chai';
import fs from "fs";
import path from "node:path";
import addContext from "mochawesome/addContext";
import {iImageOptimisationResults, iTagsTestResults} from "../automated_test_setup/_types";

let linksToTest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'automated_test_setup', 'links_to_test.json'), 'utf8'));
describe("H1 Tags Test", () => {
    before(async () => {
        await MochaSetup();
    })
    after(async () => {
        await MochaCleanup();
    })
    describe("should have at least one H1 tag on each page, and should contain content", function() {
        for(let link of linksToTest){
            it(link, async function() {
                const selector = 'h1';
                await driver.get(link);
                let h1Tags: WebElement[] = await driver.findElements(By.css(selector));
                let values: string[] = [];
                for(let h1Tag of h1Tags) {
                    let value = await h1Tag.getText();
                    value ? values.push(value) : null;
                };
                const testResultContext: iTagsTestResults = {
                    title: "should have at least one H1 tag on each page, and should contain content",
                    value: {
                        url: link,
                        tagTested: selector,
                        noOfTags: h1Tags.length,
                        tagValues: values
                    }
                }
                addContext(this, testResultContext);
                expect(h1Tags, "No H1 tag").not.to.be.null;
                expect(h1Tags.length, "No H1 tag").to.be.greaterThan(0);
                expect(values, "No H1 tag value").not.to.be.null;
                expect(values.length, "No H1 tag value").to.be.greaterThan(0);
            })
        }
    })
})



