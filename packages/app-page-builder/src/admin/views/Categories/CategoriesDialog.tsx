import React from "react";
import { Dialog, Link, List, Loader } from "@webiny/admin-ui";
import { Query } from "@apollo/react-components";
import { LIST_CATEGORIES } from "./graphql";
import { PageBuilderListCategoriesResponse, PbCategory } from "~/types";

export type CategoriesDialogProps = {
    open: boolean;
    onClose: () => void;
    onSelect: (item: PbCategory) => void;
    children: any;
};
interface ListCategoriesQueryResponse {
    data: PageBuilderListCategoriesResponse;
    loading?: boolean;
}
const CategoriesDialog = ({ open, onClose, onSelect, children }: CategoriesDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            data-testid="pb-new-page-category-modal"
            title="Select a category"
            info={
                <>
                    {"Category not listed? "}
                    <Link to={"/page-builder/categories"}>{"Create a new one"}</Link>.
                </>
            }
            actions={
                <>
                    <Dialog.CancelButton />
                </>
            }
        >
            {children}
            <List>
                <Query query={LIST_CATEGORIES}>
                    {({ data, loading }: ListCategoriesQueryResponse) => {
                        if (loading) {
                            return <Loader text={"Loading categories"} size={"lg"} />;
                        }

                        const categories = data?.pageBuilder?.listCategories?.data;
                        if (!categories) {
                            return <></>;
                        }
                        return (
                            <>
                                {categories.map(item => (
                                    <List.Item
                                        key={item.slug}
                                        onClick={() => {
                                            onSelect(item);
                                            onClose();
                                        }}
                                        title={item.name}
                                        description={item.url}
                                    />
                                ))}
                            </>
                        );
                    }}
                </Query>
            </List>
        </Dialog>
    );
};

export default CategoriesDialog;
