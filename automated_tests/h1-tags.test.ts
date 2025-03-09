import {driver, websiteToTest} from "../start-parameters";
import {By, WebElement} from "selenium-webdriver";

// let siteLinks = await driver.findElements(By.css("a"));
// let internalLinks = [...pagesToTest];
// internalLinks = internalLinks.concat(await GetInternalLinks(siteLinks));
// console.log(internalLinks);
// let title = await driver.getTitle();
// console.log(title);

describe("H1 Tags Test", ()=>{
    it("All pages have at least 1 H1 tag", async () => {

        await driver.get(websiteToTest);
        let h1Tags: WebElement[] = await driver.findElements(By.css('h1'));
        expect(h1Tags).not.toBe(null);
        expect(h1Tags.length).toBeGreaterThan(0);
    })
})

