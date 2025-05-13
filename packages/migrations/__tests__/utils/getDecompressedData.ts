import { PluginsContainer } from "@webiny/plugins";
import { createDefaultCompressor } from "@webiny/utils/compression";

const compressor = createDefaultCompressor({
    plugins: new PluginsContainer()
});

export const getDecompressedData = async <R = any>(data: any): Promise<R> => {
    return await compressor.decompress<R>(data);
};
