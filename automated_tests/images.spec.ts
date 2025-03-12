import {driver, MochaCleanup, MochaSetup} from "../automated_test_setup/_global-setup";
import {By, WebElement} from "selenium-webdriver";
import {AddOgImageTagResults, AddOgTitleTagResults} from "../automated_test_modules/_add_results";
import {expect} from 'chai';
import fs from "fs";
import path from "node:path";

let linksToTest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'automated_test_setup', 'links_to_test.json'), 'utf8'));
describe("Image Test", () => {
    before(async () => {
        await MochaSetup();
    })
    after(async () => {
        await MochaCleanup();
    })
    for (let link of linksToTest) {
        describe(link, () => {
            it("each image on page should have an alt tag, even if empty", async () => {
                await driver.get(link);
                let imgTags: WebElement[] = await driver.findElements(By.css('img'));
                let imagesWithoutAlt: string[] = [];
                for(let img of imgTags) {
                    const imgSrc = await img.getAttribute('src');
                    const imgAlt = await img.getAttribute('alt');
                    imgAlt === null || imgAlt === undefined ? imagesWithoutAlt.push(imgSrc) : null;
                }
                // let pass = imgTags.length === 1 && imagesWithoutAlt.length > 0;
                // AddOgTitleTagResults(link, pass, imgTags.length, imagesWithoutAlt);
                // expect(imgTags, "No og:title tag").not.to.be.null;
                // expect(imgTags.length, "No og:title tag").to.be.greaterThan(0);
                // expect(imgTags.length, "Too many og:title tags").to.be.lessThan(2);
                // expect(imagesWithoutAlt, "No og:title tag value").not.to.be.null;
                // expect(imagesWithoutAlt.length, "No og:title tag value").to.be.greaterThan(0);
                expect(imagesWithoutAlt.length, `The following images do not have an alt attribute - ${JSON.stringify(imagesWithoutAlt)}`).to.equal(0);
            })
            it("each PNG on page should contain transparency", async () => {
                await driver.get(link);
                let pngImgTags: WebElement[] = await driver.findElements(By.css('img[src$=".png"]'));
                let imagesWithoutTransparency: string[] = [];
                for(let img of pngImgTags) {
                    try {
                        const imgSrc = await img.getAttribute('src');
                        const response = await fetch(imgSrc);
                        const imgBuffer = await response.arrayBuffer();
                        // following code based on https://stackoverflow.com/questions/41287823/check-image-transparency
                        const view = new DataView(imgBuffer);
                        // check if image is actually a PNG
                        if (view.getUint32(0) === 0x89504E47 && view.getUint32(4) === 0x0D0A1A0A) {
                            // We know format field exists in the IHDR chunk. The chunk exists at
                            // offset 8 +8 bytes (size, name) +8 (depth) & +9 (type)
                            const depth = view.getUint8(8 + 8 + 8);
                            const typeIndex  = view.getUint8(8 + 8 + 9);
                            const type = ["G", "", "RGB", "Indexed", "GA", "", "RGBA"][typeIndex];
                            const buffer = view.buffer;
                            const hasAlpha = typeIndex === 4 || typeIndex === 6  // grayscale + alpha or RGB + alpha
                            !hasAlpha ? imagesWithoutTransparency.push(imgSrc) : null;
                        }
                    }
                    catch(err) {
                        console.error(err);
                    }
                }
                // let pass = imgTags.length === 1 && imagesWithoutAlt.length > 0;
                // AddOgTitleTagResults(link, pass, imgTags.length, imagesWithoutAlt);
                // expect(imgTags, "No og:title tag").not.to.be.null;
                // expect(imgTags.length, "No og:title tag").to.be.greaterThan(0);
                // expect(imgTags.length, "Too many og:title tags").to.be.lessThan(2);
                // expect(imagesWithoutAlt, "No og:title tag value").not.to.be.null;
                // expect(imagesWithoutAlt.length, "No og:title tag value").to.be.greaterThan(0);
                expect(imagesWithoutTransparency.length, `The following images are PNG format but have no transparency - ${JSON.stringify(imagesWithoutTransparency)}`).to.equal(0);
            })
        })
    }
})



