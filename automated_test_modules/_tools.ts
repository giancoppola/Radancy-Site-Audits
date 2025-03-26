/////////////////
// Image Tools //
/////////////////

export const GetDisplayedDimensions = (image, ViewportDimensions) => {
    if (image.displayedWidth && image.displayedHeight) {
        return {
            width: image.displayedWidth * ViewportDimensions.devicePixelRatio,
            height: image.displayedHeight * ViewportDimensions.devicePixelRatio,
        };
    }

    // If the image has 0 dimensions, it's probably hidden/offscreen, so we'll be as forgiving as possible
    // and assume it's the size of two viewports. See https://github.com/GoogleChrome/lighthouse/issues/7236
    const viewportWidth = ViewportDimensions.innerWidth;
    const viewportHeight = ViewportDimensions.innerHeight * 2;
    const imageAspectRatio = image.naturalWidth / image.naturalHeight;
    const viewportAspectRatio = viewportWidth / viewportHeight;
    let usedViewportWidth = viewportWidth;
    let usedViewportHeight = viewportHeight;
    if (imageAspectRatio > viewportAspectRatio) {
        usedViewportHeight = viewportWidth / imageAspectRatio;
    } else {
        usedViewportWidth = viewportHeight * imageAspectRatio;
    }

    return {
        width: usedViewportWidth * ViewportDimensions.devicePixelRatio,
        height: usedViewportHeight * ViewportDimensions.devicePixelRatio,
    };
}

export const ComputeWaste = (image, ViewportDimensions, networkRecords)=> {
    const networkRecord = networkRecords.find(record => record.url === image.src);
    // Nothing can be done without network info, ignore images without resource size information.
    if (!networkRecord) {
        return null;
    }

    const displayed = this.getDisplayedDimensions(image, ViewportDimensions);
    const usedPixels = displayed.width * displayed.height;

    const url = URL.elideDataURI(image.src);
    const actualPixels = image.naturalWidth * image.naturalHeight;
    const wastedRatio = 1 - (usedPixels / actualPixels);
    const totalBytes = NetworkRequest.getResourceSizeOnNetwork(networkRecord);
    const wastedBytes = Math.round(totalBytes * wastedRatio);

    return {
        url,
        totalBytes,
        wastedBytes,
        wastedPercent: 100 * wastedRatio,
    };
}

// # Of Pixels X Bit Depth ÷ 8bits in byte ÷ 1000 = File Size in Kilobytes
// Bit depth of JPG, PNG and WEBP = 24, GIF = 8
export const ImageSizeInKiBFromDimensions = (width: number, height: number, bitDepth: number): number => {
    return (((width * height) * bitDepth) / 8) / 1024
}
export const IsPngJpgWebpOrGif = (imgSrc: string): boolean => {
    return imgSrc.endsWith("png") || imgSrc.endsWith("jpg") || imgSrc.endsWith("jpeg") || imgSrc.endsWith("webp")  || imgSrc.endsWith("gif")
}

/////////////////////
// End Image Tools //
/////////////////////