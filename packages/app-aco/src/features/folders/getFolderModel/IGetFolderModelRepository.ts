import { FolderModelDto } from "./FolderModelDto";

export interface IGetFolderModelRepository {
    load: () => Promise<void>;
    getModel: () => FolderModelDto | undefined;
    hasModel: () => boolean;
}
