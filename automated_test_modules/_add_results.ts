import {TestResults} from "./_global-setup";

export const AddH1TagsResults = (url: string, pass: boolean, length: number, values: string[]) => {
    TestResults[url] = TestResults[url] || {};
    TestResults[url]["h1Tags"] = TestResults[url]["h1Tags"] || {};
    TestResults[url]["h1Tags"] = {
        pass: pass,
        number: length,
        values: values
    }
}

export const AddMetaDescriptionTagResults = (url: string, pass: boolean, length: number, values: string[]) => {
    TestResults[url] = TestResults[url] || {};
    TestResults[url]["metaDescriptionTag"] = TestResults[url]["metaDescriptionTag"] || {};
    TestResults[url]["metaDescriptionTag"] = {
        pass: pass,
        number: length,
        values: values
    }
}

export const AddOgImageTagResults = (url: string, pass: boolean, length: number, values: string[]) => {
    TestResults[url] = TestResults[url] || {};
    TestResults[url]["ogImageTag"] = TestResults[url]["ogImageTag"] || {};
    TestResults[url]["ogImageTag"] = {
        pass: pass,
        number: length,
        values: values
    }
}