import { useCategoryPreviewHandler } from "~tests/testHelpers/useCategoryPreviewHandler";

export interface CategoryPreview {
    id: string;
    entryId: string;
    title: string;
    slug: string;
}

export const createCategoryPreviewMethods = (
    reader: ReturnType<typeof useCategoryPreviewHandler>
) => {
    const getCategoryById = async (id: string): Promise<CategoryPreview> => {
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
