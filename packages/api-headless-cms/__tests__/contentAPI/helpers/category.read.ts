import { useCategoryReadHandler } from "~tests/testHelpers/useCategoryReadHandler";

export interface CategoryRead {
    id: string;
    entryId: string;
    title: string;
    slug: string;
}

export const createCategoryReadMethods = (reader: ReturnType<typeof useCategoryReadHandler>) => {
    const getCategoryById = async (id: string): Promise<CategoryRead> => {
        return await reader.getCategoryById(id).then(result => {
            const [data] = result;
            return data.data.getCategory.data;
        });
    };

    return {
        listCategories: reader.listCategories,
        getCategoryById
    };
};
