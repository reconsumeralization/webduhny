import { FolderModelDto } from "./FolderModelDto";

export interface IGetFolderModelGateway {
    execute: () => Promise<FolderModelDto>;
}
