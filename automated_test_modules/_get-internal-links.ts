import {By, ThenableWebDriver, until, WebElement} from "selenium-webdriver";
import {pagesToTest, websiteToTest} from "../automated_test_setup/_test-parameters";

export default async function GetInternalLinks(driver: ThenableWebDriver): Promise<string[]> {
    let homepage = (" " + websiteToTest).slice(1);
    if (homepage.endsWith("/")){
        homepage = homepage.slice(0, -1);
    }
    let linksToTest: string[] = [homepage];
    for(let page of pagesToTest) {
        linksToTest.push(homepage + page);
    }
    await driver.get(homepage);
    await driver.wait(until.elementsLocated(By.css("a")));
    let aTags = await driver.findElements(By.css("a"));
    for (let a of aTags) {
        let link = await a.getAttribute("href");
        let internalLink = link.startsWith("/") || link.startsWith(homepage) || link.startsWith(homepage);
        if (link && internalLink && !linksToTest.includes(link)) {
            // selenium will figure out absolute URLs from the relative URLs
            linksToTest.push(link);
        }
    }
    return linksToTest;
}