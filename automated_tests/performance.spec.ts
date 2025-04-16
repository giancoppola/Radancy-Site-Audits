import {driver, MochaCleanup, MochaSetup} from "../automated_test_setup/_global-setup";
import {expect} from 'chai';
import fs from "fs";
import path from "node:path";
import { iPageLoadSpeedTestResults } from "../automated_test_setup/_types";
const addContext = require('mochawesome/addContext');

let linksToTest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'automated_test_setup', 'links_to_test.json'), 'utf8'));
describe("Performance Test", () => {
    before(async () => {
        await MochaSetup();
    })
    after(async () => {
        await MochaCleanup();
    })
    for(let link of linksToTest) {
        describe(link, function() {
            it("should load in less than 3 seconds", async function() {
                await driver.manage().deleteAllCookies()
                const startTime = new Date().getTime();
                await driver.get(link);
                const endTime = new Date().getTime();
                const loadTimeInSeconds = (endTime - startTime) / 1000;
                const testResultContext: iPageLoadSpeedTestResults = {
                    title: "should load in less than 3 seconds",
                    value: {
                        url: link,
                        loadTime: loadTimeInSeconds
                    }
                }
                addContext(this, testResultContext);
                expect(loadTimeInSeconds, "Page load time exceeded 3 seconds").to.be.lessThan(3);
            })
        })
    }
})



