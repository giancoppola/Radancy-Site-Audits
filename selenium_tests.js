"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const getInternalLinks_1 = __importDefault(require("./selenium_tests_modules/getInternalLinks"));
const Chrome = require('selenium-webdriver/chrome');
const { Browser, Builder, ThenableWebDriver } = require("selenium-webdriver");
const { getBinaryPaths } = require("selenium-webdriver/common/driverFinder");
const options = new Chrome.Options();
const StartSiteAudit = () => __awaiter(void 0, void 0, void 0, function* () {
    let internalLinks = ["test"];
    let options = new Chrome.Options();
    options.setBrowserVersion("stable");
    let paths = getBinaryPaths(options);
    let driverPath = paths.driverPath;
    let browserPath = paths.browserPath;
    options.setChromeBinaryPath(browserPath);
    let service = new Chrome.ServiceBuilder().setPath(driverPath);
    let driver = new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .setChromeService(service)
        .build();
    yield driver.manage().setTimeouts({ implicit: 500 });
    yield driver.get('https://careers.questdiagnostics.com/');
    let siteLinks = yield driver.findElements(selenium_webdriver_1.By.css("a"));
    internalLinks = internalLinks.concat(yield (0, getInternalLinks_1.default)(siteLinks));
    console.log(internalLinks);
    let title = yield driver.getTitle();
    console.log(title);
    yield driver.quit();
});
StartSiteAudit();
