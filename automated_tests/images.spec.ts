import {driver, MochaCleanup, MochaSetup} from "../automated_test_setup/_global-setup";
import {By, WebElement} from "selenium-webdriver";
import {expect} from 'chai';
import fs from "fs";
import path from "node:path";
import { iImageTestResults } from "../automated_test_setup/_types";
import {DoesResourceLoad, GetArrayBuffer} from "../automated_test_modules/_fetch_helpers";
import {ImageSizeInKiBFromDimensions, ImgHasTransparency, IsPngJpgWebpOrGif} from "../automated_test_modules/_tools";
const addContext = require('mochawesome/addContext');

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
            it("each image on page should load correctly", async function() {
                const selector = 'img';
                await driver.get(link);
                let imgTags: WebElement[] = await driver.findElements(By.css(selector));
                let imagesNotLoading: string[] = [];
                for(let img of imgTags) {
                    const imgSrc = await img.getAttribute('src');
                    const doesElementLoad = await DoesResourceLoad(imgSrc);
                    !doesElementLoad ? imagesNotLoading.push(imgSrc) : null;
                }
                imagesNotLoading = [...new Set(imagesNotLoading)];
                const testResultContext: iImageTestResults = {
                    title: "The following images do not load correctly",
                    value: {
                        url: link,
                        noOfFailures: imagesNotLoading.length,
                        imageUrls: imagesNotLoading
                    }
                }
                addContext(this, testResultContext);
                expect(imagesNotLoading.length, "There are images that do not load properly").to.equal(0);
            })
            it("each image on page should have an alt tag, even if empty", async function() {
                const selector = 'img';
                await driver.get(link);
                let imgTags: WebElement[] = await driver.findElements(By.css(selector));
                let imagesWithoutAlt: string[] = [];
                for(let img of imgTags) {
                    const imgSrc = await img.getAttribute('src');
                    const imgAlt = await img.getAttribute('alt');
                    imgAlt === null || imgAlt === undefined ? imagesWithoutAlt.push(imgSrc) : null;
                }
                imagesWithoutAlt = [...new Set(imagesWithoutAlt)];
                const testResultContext: iImageTestResults = {
                    title: "The following images have no alt attribute",
                    value: {
                        url: link,
                        noOfFailures: imagesWithoutAlt.length,
                        imageUrls: imagesWithoutAlt
                    }
                }
                addContext(this, testResultContext);
                expect(imagesWithoutAlt.length, "There are images that have no alt attribute").to.equal(0);
            })
            it("each image should not be larger than they are rendered on page", async function() {
                // Based on the lighthouse "Properly size images" test
                // https://github.com/GoogleChrome/lighthouse/blob/a1dfe6c5d85e300d53538ac1bf607b99da12989f/lighthouse-core/audits/byte-efficiency/uses-responsive-images.js#L128-L137
                const selector = 'img';
                await driver.get(link);
                let imgTags: WebElement[] = await driver.findElements(By.css(selector));
                let imagesLargerThanRendered: string[] = [];
                let testThisImage = true;
                for(let img of imgTags) {
                    testThisImage = true;
                    const imgSrc = await img.getAttribute('src');
                    if (IsPngJpgWebpOrGif(imgSrc)) {
                        const imgBitDepth = imgSrc.endsWith("gif") ? 8 : 24;
                        const imgSize = await img.getRect();
                        const devicePixelRatio: number = await driver.executeScript("return window.devicePixelRatio");
                        const naturalWidth = await img.getAttribute('naturalWidth');
                        const naturalHeight = await img.getAttribute('naturalHeight');
                        if (!naturalHeight || !naturalWidth) { testThisImage = false; }
                        // 4kb buffer same as with Google's lighthouse testing
                        const sizeBufferInKiB = 4;
                        const naturalSize = ImageSizeInKiBFromDimensions(parseInt(naturalWidth), parseInt(naturalHeight), imgBitDepth);
                        const renderedSize = ImageSizeInKiBFromDimensions(imgSize.width, imgSize.height, imgBitDepth);
                        console.log("Image: ", imgSrc);
                        console.log("Natural Size: ", naturalSize);
                        console.log("Rendered Size: ", renderedSize);
                        console.log("Pass: ", (naturalSize - sizeBufferInKiB) < renderedSize);
                        if (naturalSize < sizeBufferInKiB || renderedSize < sizeBufferInKiB) { testThisImage = false; }
                        if (testThisImage) {
                            // If the rendered size is at least 4KiB smaller than the actual size, then the image fails the audit.
                            (naturalSize - sizeBufferInKiB) >= renderedSize ? imagesLargerThanRendered.push(imgSrc) : null;
                        }
                    }
                }
                imagesLargerThanRendered = [...new Set(imagesLargerThanRendered)];
                const testResultContext: iImageTestResults = {
                    title: "The following images are larger than they are rendered on page",
                    value: {
                        url: link,
                        noOfFailures: imagesLargerThanRendered.length,
                        imageUrls: imagesLargerThanRendered
                    }
                }
                addContext(this, testResultContext);
                expect(imagesLargerThanRendered.length, "The following images are larger than they are rendered on page").to.equal(0);
            })
            it("each PNG on page should contain transparency", async function() {
                const selector = 'img[src$=".png"]';
                await driver.get(link);
                let pngImgTags: WebElement[] = await driver.findElements(By.css(selector));
                let imagesWithoutTransparency: string[] = [];
                for(let img of pngImgTags) {
                    try {
                        const imgSrc = await img.getAttribute('src');
                        const hasTransparency: boolean = await ImgHasTransparency(imgSrc);
                        !hasTransparency ? imagesWithoutTransparency.push(imgSrc) : null;
                    }
                    catch(err) {
                        console.error(err);
                    }
                }
                imagesWithoutTransparency = [...new Set(imagesWithoutTransparency)];
                const testResultContext: iImageTestResults = {
                    title: "The following PNGs do not contain transparency, and so can use a different image format",
                    value: {
                        url: link,
                        noOfFailures: imagesWithoutTransparency.length,
                        imageUrls: imagesWithoutTransparency
                    }
                }
                addContext(this, testResultContext);
                expect(imagesWithoutTransparency.length, "There are PNGs in use that do not contain transparency").to.equal(0);
            })
            it("each image on page should be under 800kb", async function() {
                const selector = 'img';
                await driver.get(link);
                let imgTags: WebElement[] = await driver.findElements(By.css(selector));
                let imagesToOptimise: string[] = [];
                for(let img of imgTags) {
                    try {
                        const imgSrc = await img.getAttribute('src');
                        const response = await fetch(imgSrc);
                        const imgBuffer = await response.arrayBuffer();
                        const sizeInKb = imgBuffer.byteLength / 1000;
                        const maxSizeInKb = 800;
                        sizeInKb > maxSizeInKb ? imagesToOptimise.push(`${imgSrc} - ${sizeInKb}kb`) : null;
                    }
                    catch(err) {
                        console.error(err);
                    }
                }
                imagesToOptimise = [...new Set(imagesToOptimise)];
                const testResultContext: iImageTestResults = {
                    title: "The following images are over 800kb in size, and may require optimisation",
                    value: {
                        url: link,
                        noOfFailures: imagesToOptimise.length,
                        imageUrls: imagesToOptimise
                    }
                }
                addContext(this, testResultContext);
                expect(imagesToOptimise.length, "There are images that are over 800kb in size, and may require optimisation").to.equal(0);
            })
        })
    }
})



