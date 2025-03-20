// # Of Pixels X Bit Depth ÷ 8bits in byte ÷ 1000 = File Size in Kilobytes
// Bit depth of JPG, PNG and WEBP = 24, GIF = 8
export const ImageSizeInKbFromDimensions = (width: number, height: number, bitDepth: number): number => {
    return (((width * height) * bitDepth) / bitDepth) / 1000
}