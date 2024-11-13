export interface IPreset {
    name: string;
    matching: RegExp;
}
export interface ICreatePresetCb {
    (): IPreset;
}

export const createPreset = (cb: ICreatePresetCb) => {
    return cb();
};
