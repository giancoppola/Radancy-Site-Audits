import {websiteToTest} from "../test-parameters";
import {driver, TestResults} from "../automated_test_modules/_jest-global-setup";
import {By, WebElement} from "selenium-webdriver";
import {AddH1TagsResults} from "../automated_test_modules/_add_results";

// let siteLinks = await driver.findElements(By.css("a"));
// let internalLinks = [...pagesToTest];
// internalLinks = internalLinks.concat(await GetInternalLinks(siteLinks));
// console.log(internalLinks);
// let title = await driver.getTitle();
// console.log(title);

describe("H1 Tags Test", ()=>{
    test("All pages have at least 1 H1 tag", async () => {
        await driver.get(websiteToTest);
        let h1Tags: WebElement[] = await driver.findElements(By.css('h1'));
        expect(h1Tags).not.toBe(null);
        expect(h1Tags.length).toBeGreaterThan(0);
        let url = await driver.getCurrentUrl();
        let values: string[] = [];
        let pass = h1Tags.length > 0;
        await Promise.all(h1Tags.map(async h1Tag => {
            let value = await h1Tag.getText();
            values.push(value);
            expect(value).not.toBeNull();
        }));
        AddH1TagsResults(url, pass, h1Tags.length, values);
    }, 10000)
})

