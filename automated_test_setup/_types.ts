export interface iTestResults {
    [key: string]: iURLTestResults
}
export interface iURLTestResults {
    h1Tags: {
        pass: boolean;
        noOfTags: number;
        tagValues: string[];
    }
    metaDescriptionTag: {
        pass: boolean;
        noOfTags: number;
        tagValues: string[];
    }
    ogImageTag: {
        pass: boolean;
        noOfTags: number;
        tagValues: string[];
    }
    ogTitleTag: {
        pass: boolean;
        noOfTags: number;
        tagValues: string[];
    }
}