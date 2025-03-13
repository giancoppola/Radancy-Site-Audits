// All test result types must follow this basic outline
// {
//     title: string,
//     value: any,
// }

export interface iTagsTestResults {
    title: string,
    value: {
        url: string,
        tagTested: string,
        noOfTags: number,
        tagValues: string[],
    }
}

export interface iPNGTestResults {
    title: string,
    value: {
        url: string,
        noOfPngsWithoutTransparency: number,
        imageUrls: string[],
    }
}

export interface iImageAltTestResults {
    title: string,
    value: {
        url: string,
        noOfImagesWithoutAltTag: number,
        imageUrls: string[],
    }
}

export interface iImageOptimisationResults {
    title: string,
    value: {
        url: string,
        noOfImagesRequiringOptimisation: number,
        imageUrls: string[],
    }
}