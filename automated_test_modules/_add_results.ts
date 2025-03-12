import {TestResults} from "../automated_test_setup/_global-setup";

export const AddH1TagsResults = (url: string, pass: boolean, length: number, values: string[]) => {
    TestResults[url] = TestResults[url] || {};
    TestResults[url]["h1Tags"] = TestResults[url]["h1Tags"] || {};
    TestResults[url]["h1Tags"] = {
        pass: pass,
        noOfTags: length,
        tagValues: values
    }
}

export const AddMetaDescriptionTagResults = (url: string, pass: boolean, length: number, values: string[]) => {
    TestResults[url] = TestResults[url] || {};
    TestResults[url]["metaDescriptionTag"] = TestResults[url]["metaDescriptionTag"] || {};
    TestResults[url]["metaDescriptionTag"] = {
        pass: pass,
        noOfTags: length,
        tagValues: values
    }
}

export const AddOgImageTagResults = (url: string, pass: boolean, length: number, values: string[]) => {
    TestResults[url] = TestResults[url] || {};
    TestResults[url]["ogImageTag"] = TestResults[url]["ogImageTag"] || {};
    TestResults[url]["ogImageTag"] = {
        pass: pass,
        noOfTags: length,
        tagValues: values
    }
}

export const AddOgTitleTagResults = (url: string, pass: boolean, length: number, values: string[]) => {
    TestResults[url] = TestResults[url] || {};
    TestResults[url]["ogTitleTag"] = TestResults[url]["ogTitleTag"] || {};
    TestResults[url]["ogTitleTag"] = {
        pass: pass,
        noOfTags: length,
        tagValues: values
    }
}