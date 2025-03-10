import {driver, linksToTest, MochaCleanup, MochaSetup} from "../automated_test_modules/_global-setup";
import {By, WebElement} from "selenium-webdriver";
import {AddH1TagsResults} from "../automated_test_modules/_add_results";
const assert = require('assert');
import {expect} from 'chai';

describe("H1 Tags Test", () => {
    before(async () => {
        await MochaSetup();
    })
    after(async () => {
        await MochaCleanup();
    })
    it("should have at least one H1 tag on each page", async () => {
        for(let link of linksToTest){
            await driver.get(link);
            let h1Tags: WebElement[] = await driver.findElements(By.css('h1'));
            expect(h1Tags).not.to.be.null;
            expect(h1Tags.length).to.be.greaterThan(0);
            let url = await driver.getCurrentUrl();
            let values: string[] = [];
            let pass = h1Tags.length > 0;
            for(let h1Tag of h1Tags) {
                let value = await h1Tag.getText();
                values.push(value);
                expect(value).not.to.be.null;
            };
            let resultsLink = (" " + url).slice(1);
            AddH1TagsResults(resultsLink, pass, h1Tags.length, values);
        }
    })
})



