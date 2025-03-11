import {driver, MochaCleanup, MochaSetup} from "../automated_test_modules/_global-setup";
import {By, WebElement} from "selenium-webdriver";
import {AddH1TagsResults} from "../automated_test_modules/_add_results";
import {expect} from 'chai';
import fs from "fs";
import path from "node:path";

let linksToTest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'automated_test_setup', 'links_to_test.json'), 'utf8'));
describe("H1 Tags Test", () => {
    before(async () => {
        await MochaSetup();
    })
    after(async () => {
        await MochaCleanup();
    })
    describe("should have at least one H1 tag on each page, and should contain content", () => {
        for(let link of linksToTest){
            it(link, async () => {
                await driver.get(link);
                let h1Tags: WebElement[] = await driver.findElements(By.css('h1'));
                let values: string[] = [];
                for(let h1Tag of h1Tags) {
                    let value = await h1Tag.getText();
                    value ? values.push(value) : null;
                };
                let pass = h1Tags.length > 0 && values.length > 0;
                AddH1TagsResults(link, pass, h1Tags.length, values);
                expect(h1Tags).not.to.be.null;
                expect(h1Tags.length).to.be.greaterThan(0);
                expect(values).not.to.be.null;
                expect(values.length).to.be.greaterThan(0);
            })
        }
    })
})



