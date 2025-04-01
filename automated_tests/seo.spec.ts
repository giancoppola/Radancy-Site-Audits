import {driver, MochaCleanup, MochaSetup} from "../automated_test_setup/_global-setup";
import {By, WebElement} from "selenium-webdriver";
import {expect} from 'chai';
import fs from "fs";
import path from "node:path";
import addContext from "mochawesome/addContext";
import { iHasTagTestResults, iHasTagAndContentLoadsTestResults } from "../automated_test_setup/_types";
import {DoesResourceLoad} from "../automated_test_modules/_fetch_helpers";

let linksToTest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'automated_test_setup', 'links_to_test.json'), 'utf8'));
describe("SEO Test", () => {
    before(async () => {
        await MochaSetup();
    })
    after(async () => {
        await MochaCleanup();
    })
    for(let link of linksToTest){
        describe(link, function() {
            it("should have at least one H1 tag, and should contain content", async function() {
                const selector = 'h1';
                await driver.get(link);
                let h1Tags: WebElement[] = await driver.findElements(By.css(selector));
                let values: string[] = [];
                for(let h1Tag of h1Tags) {
                    let value = await h1Tag.getText();
                    value ? values.push(value) : null;
                };
                const testResultContext: iHasTagTestResults = {
                    title: "should have at least one H1 tag on each page, and should contain content",
                    value: {
                        url: link,
                        tagTested: selector,
                        noOfTags: h1Tags.length,
                        tagValues: values
                    }
                }
                addContext(this, testResultContext);
                expect(h1Tags, "No H1 tag").not.to.be.null;
                expect(h1Tags.length, "No H1 tag").to.be.greaterThan(0);
                expect(values, "No H1 tag value").not.to.be.null;
                expect(values.length, "No H1 tag value").to.be.greaterThan(0);
            })
            it("should have one title tag, and should contain content", async function() {
                const selector = 'title';
                await driver.get(link);
                const titleTags: WebElement[] = await driver.findElements(By.css(selector));
                const title = await driver.getTitle()
                const testResultContext: iHasTagTestResults = {
                    title: "each page on site should have one title tag, and should contain content",
                    value: {
                        url: link,
                        tagTested: selector,
                        noOfTags: titleTags.length,
                        tagValues: [title]
                    }
                }
                addContext(this, testResultContext);
                expect(titleTags, "No title tag").not.to.be.null;
                expect(titleTags.length, "No title tag").to.be.greaterThan(0);
                expect(titleTags.length, "Too many title tags").to.be.lessThan(2);
                expect(title, "No title tag value").not.to.be.null;
                expect(title.length, "No title tag value").to.be.greaterThan(0);
            })
            it("should have one meta description tag, and should contain content", async function() {
                const selector = 'meta[name="description"]';
                await driver.get(link);
                let metaDescriptionTags: WebElement[] = await driver.findElements(By.css(selector));
                let values: string[] = [];
                for(let tag of metaDescriptionTags) {
                    let value = await tag.getAttribute("content");
                    value ? values.push(value) : null;
                }
                const testResultContext: iHasTagTestResults = {
                    title: "should have one meta description tag on each page, and should contain content",
                    value: {
                        url: link,
                        tagTested: selector,
                        noOfTags: metaDescriptionTags.length,
                        tagValues: values
                    }
                }
                addContext(this, testResultContext);
                expect(metaDescriptionTags, "No meta description tag").not.to.be.null;
                expect(metaDescriptionTags.length, "No meta description tag").to.be.greaterThan(0);
                expect(metaDescriptionTags.length, "Too many meta description tags").to.be.lessThan(2);
                expect(values, "No meta description tag value").not.to.be.null;
                expect(values.length, "No meta description tag value").to.be.greaterThan(0);
            })
            it("should have one og:image tag, containing an image that should load properly", async function() {
                const selector = 'meta[property="og:image"]';
                await driver.get(link);
                let contentLoads = false;
                let ogImageTags: WebElement[] = await driver.findElements(By.css(selector));
                let values: string[] = [];
                for(let tag of ogImageTags) {
                    let value = await tag.getAttribute("content");
                    value ? values.push(value) : null;
                }
                for(let url of values) {
                    contentLoads = await DoesResourceLoad(url);
                }
                const testResultContext: iHasTagAndContentLoadsTestResults = {
                    title: "should have one og:image tag, containing an image that should load properly",
                    value: {
                        url: link,
                        tagTested: selector,
                        noOfTags: ogImageTags.length,
                        tagValues: values,
                        contentLoads: contentLoads
                    }
                }
                addContext(this, testResultContext);
                expect(ogImageTags, "No og:image tag").not.to.be.null;
                expect(ogImageTags.length, "No og:image tag").to.be.greaterThan(0);
                expect(ogImageTags.length, "Too many og:image tags").to.be.lessThan(2);
                expect(values, "No og:image tag value").not.to.be.null;
                expect(values.length, "No og:image tag value").to.be.greaterThan(0);
                expect(contentLoads, "Image does not load properly").to.be.true;
            })
            it("should have one og:title tag, and should contain content", async function() {
                const selector = 'meta[property="og:title"]';
                await driver.get(link);
                let ogTitleTags: WebElement[] = await driver.findElements(By.css(selector));
                let values: string[] = [];
                for(let tag of ogTitleTags) {
                    let value = await tag.getAttribute("content");
                    value ? values.push(value) : null;
                }
                const testResultContext: iHasTagTestResults = {
                    title: "each page on site should have one og:title tag, and should contain content",
                    value: {
                        url: link,
                        tagTested: selector,
                        noOfTags: ogTitleTags.length,
                        tagValues: values
                    }
                }
                addContext(this, testResultContext);
                expect(ogTitleTags, "No og:title tag").not.to.be.null;
                expect(ogTitleTags.length, "No og:title tag").to.be.greaterThan(0);
                expect(ogTitleTags.length, "Too many og:title tags").to.be.lessThan(2);
                expect(values, "No og:title tag value").not.to.be.null;
                expect(values.length, "No og:title tag value").to.be.greaterThan(0);
            })
            it("should have one twitter:title tag, and should contain content", async function() {
                const selector = 'meta[name="twitter:title"]';
                await driver.get(link);
                let twitterTitleTags: WebElement[] = await driver.findElements(By.css(selector));
                let values: string[] = [];
                for(let tag of twitterTitleTags) {
                    let value = await tag.getAttribute("content");
                    value ? values.push(value) : null;
                }
                const testResultContext: iHasTagTestResults = {
                    title: "each page on site should have one twitter:title tag, and should contain content",
                    value: {
                        url: link,
                        tagTested: selector,
                        noOfTags: twitterTitleTags.length,
                        tagValues: values
                    }
                }
                addContext(this, testResultContext);
                expect(twitterTitleTags, "No twitter:title tag").not.to.be.null;
                expect(twitterTitleTags.length, "No twitter:title tag").to.be.greaterThan(0);
                expect(twitterTitleTags.length, "Too many twitter:title tags").to.be.lessThan(2);
                expect(values, "No twitter:title tag value").not.to.be.null;
                expect(values.length, "No twitter:title tag value").to.be.greaterThan(0);
            })
            it("should have one twitter:image tag, containing an image that should load properly", async function() {
                const selector = 'meta[name="twitter:image"]';
                await driver.get(link);
                let contentLoads = false;
                let twitterImageTags: WebElement[] = await driver.findElements(By.css(selector));
                let values: string[] = [];
                for(let tag of twitterImageTags) {
                    let value = await tag.getAttribute("content");
                    value ? values.push(value) : null;
                }
                for(let url of values) {
                    contentLoads = await DoesResourceLoad(url);
                }
                const testResultContext: iHasTagAndContentLoadsTestResults = {
                    title: "each page on site should have one twitter:image tag, and should contain content",
                    value: {
                        url: link,
                        tagTested: selector,
                        noOfTags: twitterImageTags.length,
                        tagValues: values,
                        contentLoads: contentLoads
                    }
                }
                addContext(this, testResultContext);
                expect(twitterImageTags, "No twitter:image tag").not.to.be.null;
                expect(twitterImageTags.length, "No twitter:image tag").to.be.greaterThan(0);
                expect(twitterImageTags.length, "Too many twitter:image tags").to.be.lessThan(2);
                expect(values, "No twitter:image tag value").not.to.be.null;
                expect(values.length, "No twitter:image tag value").to.be.greaterThan(0);
            })
            it("should have one favicon tag, containing an image that should load properly", async function() {
                const selector = 'link[rel*="icon"]';
                await driver.get(link);
                let contentLoads = false;
                let faviconTags: WebElement[] = await driver.findElements(By.css(selector));
                let values: string[] = [];
                for(let tag of faviconTags) {
                    let value = await tag.getAttribute("href");
                    value ? values.push(value) : null;
                }
                for(let url of values) {
                    contentLoads = await DoesResourceLoad(url);
                }
                const testResultContext: iHasTagAndContentLoadsTestResults = {
                    title: "should have one favicon tag, containing an image that should load properly",
                    value: {
                        url: link,
                        tagTested: selector,
                        noOfTags: faviconTags.length,
                        tagValues: values,
                        contentLoads: contentLoads
                    }
                }
                addContext(this, testResultContext);
                expect(faviconTags, "No favicon tag").not.to.be.null;
                expect(faviconTags.length, "No favicon tag").to.be.greaterThan(0);
                expect(faviconTags.length, "Too many favicon tags").to.be.lessThan(2);
                expect(values, "No favicon tag value").not.to.be.null;
                expect(values.length, "No favicon tag value").to.be.greaterThan(0);
                expect(contentLoads, "Favicon image does not load").to.be.true;
            })
        })
    }
})



