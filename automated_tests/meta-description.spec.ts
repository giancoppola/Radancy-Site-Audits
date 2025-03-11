import {driver, MochaCleanup, MochaSetup} from "../automated_test_modules/_global-setup";
import {By, WebElement} from "selenium-webdriver";
import {AddMetaDescriptionTagResults} from "../automated_test_modules/_add_results";
import {expect} from 'chai';
import fs from "fs";
import path from "node:path";

let linksToTest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'automated_test_setup', 'links_to_test.json'), 'utf8'));
describe("Meta Description Test", () => {
    before(async () => {
        await MochaSetup();
    })
    after(async () => {
        await MochaCleanup();
    })
    describe("should have one meta description tag on each page, and should contain content", () => {
        for(let link of linksToTest){
            it(link, async () => {
                await driver.get(link);
                let metaDescriptionTags: WebElement[] = await driver.findElements(By.css('meta[name="description"]'));
                let values: string[] = [];
                for(let tag of metaDescriptionTags) {
                    let value = await tag.getAttribute("content");
                    value ? values.push(value) : null;
                };
                let pass = metaDescriptionTags.length === 1 && values.length > 0;
                AddMetaDescriptionTagResults(link, pass, metaDescriptionTags.length, values);
                expect(metaDescriptionTags).not.to.be.null;
                expect(metaDescriptionTags.length).to.be.equal(1);
                expect(values).not.to.be.null;
                expect(values.length).to.be.greaterThan(0);
            })
        }
    })
})



