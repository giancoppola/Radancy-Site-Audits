export interface iTestResults {
    [key: string]: iURLTestResults
}
export interface iURLTestResults {
    h1Tags: {
        pass: boolean;
        number: number;
        values: string[];
    }
    metaDescriptionTag: {
        pass: boolean;
        number: number;
        values: string[];
    }
    ogImageTag: {
        pass: boolean;
        number: number;
        values: string[];
    }
}