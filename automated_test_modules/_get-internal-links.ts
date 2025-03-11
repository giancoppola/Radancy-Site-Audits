import {By, ThenableWebDriver, until, WebElement} from "selenium-webdriver";
import {pagesToTest, websiteToTest} from "../automated_test_setup/_test-parameters";


export default async function GetInternalLinks(driver: ThenableWebDriver): Promise<string[]> {
    let linksToTest: string[] = [websiteToTest];
    for(let page of pagesToTest) {
        linksToTest.push(websiteToTest + page);
    }
    await driver.get(websiteToTest);
    await driver.wait(until.elementsLocated(By.css("a")));
    let aTags = await driver.findElements(By.css("a"));
    for (let a of aTags) {
        let link = await a.getAttribute("href");
        let internalLink = link.startsWith("/") || link.startsWith(websiteToTest) || link.startsWith(websiteToTest);
        if (link && internalLink && !linksToTest.includes(link)) {
            linksToTest.push(link);
        }
    }
    return linksToTest;
}