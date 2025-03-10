import {TestResults} from "./_jest-global-setup";

export const AddH1TagsResults = (url: string, pass: boolean, length: number, values: string[]) => {
    TestResults[url] = TestResults[url] || {};
    TestResults[url]["h1Tags"] = TestResults[url]["h1Tags"] || {};
    TestResults[url]["h1Tags"] = {
        pass: pass,
        number: length,
        values: values
    }
}