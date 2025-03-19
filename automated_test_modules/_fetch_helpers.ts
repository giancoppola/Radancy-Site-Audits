export const DoesResourceLoad = async (url: string) :Promise<boolean> => {
    try {
        const response = await fetch(url);
        return response.ok
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

export const GetArrayBuffer = async (url: string) :Promise<ArrayBuffer> => {
    const response = await fetch(url);
    return await response.arrayBuffer();
}