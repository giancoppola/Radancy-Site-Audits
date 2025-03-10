import {TestResults} from "./_global-setup";

export const AddH1TagsResults = (url: string, pass: boolean, length: number, values: string[]) => {
    let link = (" " + url).slice(1);
    TestResults[link] = TestResults[link] || {};
    TestResults[link]["h1Tags"] = TestResults[link]["h1Tags"] || {};
    TestResults[link]["h1Tags"] = {
        pass: pass,
        number: length,
        values: values
    }
}