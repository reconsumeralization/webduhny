import { GetAncestors } from "./GetAncestors";

export const getGetAncestors = () => {
    const getAncestorsUseCase = new GetAncestors();

    return {
        getAncestorsUseCase
    };
};
