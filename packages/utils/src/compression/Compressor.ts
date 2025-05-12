import { PluginsContainer } from "@webiny/plugins";
import { CompressionPlugin, type ICompressedValue } from "./CompressionPlugin.js";
import { createGzipCompression } from "./plugins/GzipCompression.js";
import { createJsonpackCompression } from "./plugins/JsonpackCompression.js";

export interface ICompressorParams {
    plugins: PluginsContainer;
}

export interface ICompressor {
    /**
     * Adds a new compression plugin to the compressor.
     * It can also replace an existing one, by name.
     */
    addPlugin(plugin: CompressionPlugin): void;
    /**
     * Compresses the given data using the first plugin that can compress it.
     */
    compress<T = unknown>(data: T): Promise<T | ICompressedValue>;
    /**
     * Decompresses the given data using the first plugin that can decompress it.
     */
    decompress<T = unknown>(data: ICompressedValue | unknown): Promise<T>;
}

class Compressor implements ICompressor {
    private readonly plugins: CompressionPlugin[];

    public constructor(params: ICompressorParams) {
        this.plugins = params.plugins.byType<CompressionPlugin>(CompressionPlugin.type);
    }

    public addPlugin(plugin: CompressionPlugin) {
        const index = this.plugins.findIndex(p => p.name === plugin.name);
        if (index === -1) {
            this.plugins.push(plugin);
            return;
        }

        this.plugins[index] = plugin;
    }

    public async compress<T = unknown>(data: T): Promise<T | ICompressedValue> {
        for (const plugin of this.plugins) {
            if (plugin.canCompress(data) === false) {
                continue;
            }
            try {
                return await plugin.compress(data);
            } catch (ex) {
                console.error(
                    `Could not compress given data. More info in next line. Trying next plugin.`
                );
                console.log(ex);
            }
        }
        return data;
    }

    public async decompress<T = unknown>(data: ICompressedValue | unknown): Promise<T> {
        for (const plugin of this.plugins) {
            if (plugin.canDecompress(data) === false) {
                continue;
            }
            try {
                return await plugin.decompress(data);
            } catch (ex) {
                console.error(
                    `Could not decompress given data. More info in next line. Trying next plugin.`
                );
                console.log(ex);
            }
        }
        return data as T;
    }
}

const plugins = new PluginsContainer([createGzipCompression(), createJsonpackCompression()]);

const createDefaultCompressor = () => {
    return new Compressor({
        plugins
    });
};

export const defaultCompressor = createDefaultCompressor();
