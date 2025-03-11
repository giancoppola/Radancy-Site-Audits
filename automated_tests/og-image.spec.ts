import {driver, MochaCleanup, MochaSetup} from "../automated_test_modules/_global-setup";
import {By, WebElement} from "selenium-webdriver";
import {AddOgImageTagResults} from "../automated_test_modules/_add_results";
import {expect} from 'chai';
import fs from "fs";
import path from "node:path";

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
            it(link, async () => {
                await driver.get(link);
                let ogImageTags: WebElement[] = await driver.findElements(By.css('meta[property="og:image"]'));
                expect(ogImageTags, link).not.to.be.null;
                expect(ogImageTags.length).to.be.equal(1);
                let url = await driver.getCurrentUrl();
                let values: string[] = [];
                for(let tag of ogImageTags) {
                    let value = await tag.getAttribute("content");
                    value ? values.push(value) : null;
                    expect(value).not.to.be.null;
                };
                let pass = ogImageTags.length === 1 && values.length > 0;
                let resultsLink = (" " + url).slice(1);
                AddOgImageTagResults(resultsLink, pass, ogImageTags.length, values);
            })
        }
    })
})

// it("should have one og:image tag on each page, and should contain content", async () => {
//     for(let link of linksToTest){
//         await driver.get(link);
//         let ogImageTags: WebElement[] = await driver.findElements(By.css('meta[property="og:image"]'));
//         expect(ogImageTags, link).not.to.be.null;
//         expect(ogImageTags.length).to.be.equal(1);
//         let url = await driver.getCurrentUrl();
//         let values: string[] = [];
//         for(let tag of ogImageTags) {
//             let value = await tag.getAttribute("content");
//             value ? values.push(value) : null;
//             expect(value).not.to.be.null;
//         };
//         let pass = ogImageTags.length === 1 && values.length > 0;
//         let resultsLink = (" " + url).slice(1);
//         AddOgImageTagResults(resultsLink, pass, ogImageTags.length, values);
//     }
// })



