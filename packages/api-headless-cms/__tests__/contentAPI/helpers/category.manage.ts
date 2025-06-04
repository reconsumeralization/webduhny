import { useCategoryManageHandler } from "~tests/testHelpers/useCategoryManageHandler";

export interface CategoryParams {
    title: string;
    slug: string;
}

export interface CategoryManage {
    id: string;
    entryId: string;
    title: string;
    slug: string;
    wbyAco_location: {
        folderId: string;
    };
}

export const createCategoryManageMethods = (
    manager: ReturnType<typeof useCategoryManageHandler>
) => {
    const getCategory = async (revision: string): Promise<CategoryManage> => {
        return await manager
            .getCategory({
                revision
            })
            .then(result => {
                const [data] = result;
                return data.data.getCategory.data;
            });
    };

    const createCategory = async (data: CategoryParams): Promise<CategoryManage> => {
        return await manager
            .createCategory({
                data
            })
            .then(result => {
                const [data] = result;
                return data.data.createCategory.data;
            });
    };

    const createCategoryFrom = async (category: CategoryManage): Promise<CategoryManage> => {
        return await manager
            .createCategoryFrom({
                revision: category.id
            })
            .then(result => {
                const [data] = result;
                return data.data.createCategoryFrom.data;
            });
    };

    const publishCategory = async (revision: string): Promise<CategoryManage> => {
        return await manager
            .publishCategory({
                revision
            })
            .then(result => {
                const [data] = result;
                return data.data.publishCategory.data;
            });
    };

    return {
        publishCategory,
        getCategory,
        createCategory,
        createCategoryFrom
    };
};
