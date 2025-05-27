import { GetAncestors } from "./GetAncestors";
import type { IListFolders } from "~/folder/useCases/ListFolders/IListFolders";

interface GetAncestorsUseCasesParams {
    listFoldersUseCase: IListFolders;
}

export const getGetAncestors = (params: GetAncestorsUseCasesParams) => {
    const getAncestorsUseCase = new GetAncestors(params.listFoldersUseCase);

    return {
        getAncestorsUseCase
    };
};
