import { createDefaultCompressor } from "@webiny/utils";

const compressor = createDefaultCompressor();

export const getDecompressedData = async <R = any>(data: any): Promise<R> => {
    return await compressor.decompress<R>(data);
};
