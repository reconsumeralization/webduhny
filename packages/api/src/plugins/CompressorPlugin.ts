import { Plugin } from "@webiny/plugins/Plugin.js";
import { ICompressor } from "@webiny/utils/compression/Compressor.js";
import type { Context } from "~/types.js";

export interface ICompressorPluginParams {
    context: Context;
}

/**
 * Should never be initialized outside the api package.
 */
export class CompressorPlugin extends Plugin {
    public static override type: string = "context.compressor";

    private readonly context: Context;

    public constructor(params: ICompressorPluginParams) {
        super();
        this.context = params.context;
    }

    public getCompressor(): ICompressor {
        return this.context.compressor;
    }
}
