import { Plugin } from "@webiny/plugins/Plugin";
import { ICompressor } from "@webiny/utils/compression/Compressor";

export interface ICompressorPluginParams {
    getCompressor(): ICompressor;
}

/**
 * Should never be initialized outside the api package.
 */
export class CompressorPlugin extends Plugin {
    public override readonly name: string = "context.compressor";
    public static override type: string = "context.compressor";

    public readonly getCompressor: () => ICompressor;

    public constructor(params: ICompressorPluginParams) {
        super();
        this.getCompressor = params.getCompressor;
    }
}
