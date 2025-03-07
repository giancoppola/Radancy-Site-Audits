import {WebElement} from "selenium-webdriver";

export default async function GetInternalLinks(siteLinks: WebElement[]): Promise<string[]> {
    let internalLinks: string[] = [];
    await Promise.all(siteLinks.map( async (link) => {
        let href = await link.getAttribute('href');
        let isInternalLink = href.startsWith("https://careers.questdiagnostics.com/") || href.startsWith("/");
        if (href && isInternalLink) {
            internalLinks.push(href);
        }
    }))
    return internalLinks;
}