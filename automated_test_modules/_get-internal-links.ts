import {By, ThenableWebDriver, WebElement} from "selenium-webdriver";
import {pagesToTest, websiteToTest} from "../test-parameters";

export default async function GetInternalLinks(driver: ThenableWebDriver): Promise<string[]> {
    let linksToTest: string[] = [websiteToTest];
    await Promise.all(pagesToTest.map(async (page) => {
        linksToTest.push(websiteToTest + page);
    }))
    await driver.get(websiteToTest);
    let aTags = await driver.findElements(By.css("a"));
    await Promise.all(aTags.map(async (a) => {
        let link = await a.getAttribute("href");
        let internalLink = link.startsWith("/") || link.startsWith(websiteToTest) || link.startsWith(websiteToTest);
        if (link && internalLink) {
            linksToTest.push(link);
        }
    }))
    console.log(linksToTest);
    return linksToTest;
}