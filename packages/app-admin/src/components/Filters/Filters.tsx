import React from "react";
import { Separator } from "@webiny/admin-ui";
import { Form, FormOnSubmit, FormProps, GenericFormData } from "@webiny/form";

type Filter = {
    name: string;
    element: React.ReactElement;
};

export type GenericFiltersData = GenericFormData;

export type FiltersOnSubmit<T extends GenericFiltersData = GenericFiltersData> = FormOnSubmit<T>;

export interface FiltersProps<T extends GenericFormData = GenericFormData>
    extends Pick<FormProps<T>, "data" | "onChange"> {
    filters: Filter[];
    show: boolean;
    children?: React.ReactNode;
    ["data-testid"]?: string;
}

export const Filters = <T extends GenericFiltersData = GenericFiltersData>(
    props: FiltersProps<T>
) => {
    if (!props.show || !props.filters.length) {
        return null;
    }

    return (
        <>
            <div
                className={"wby-w-full wby-bg-neutral-base wby-px-md wby-my-sm"}
                data-testid={props["data-testid"] || "filters-container"}
            >
                <Form data={props.data} onChange={props.onChange}>
                    {() => (
                        <div className={"wby-w-full wby-flex wby-gap-sm wby-flex-wrap"}>
                            {props.filters.map(filter => (
                                <div key={filter.name}>{filter.element}</div>
                            ))}
                            {props.children}
                        </div>
                    )}
                </Form>
            </div>
            <Separator variant={"subtle"} margin={"none"} />
        </>
    );
};
