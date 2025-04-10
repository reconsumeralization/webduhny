import React from "react";
import { Form } from "@webiny/form";
import { TagsMultiAutocomplete } from "~/admin/components/TagsMultiAutocomplete";
import { CategoriesAutocomplete } from "~/admin/components/CategoriesAutocomplete";
import { validation } from "@webiny/validation";
import { FormOnSubmit } from "@webiny/form/types";
import { MenuTreeItem } from "~/admin/views/Menus/types";
import { Button, Grid, Heading, Input, Select } from "@webiny/admin-ui";

interface LinkFormProps {
    data: MenuTreeItem;
    onSubmit: FormOnSubmit;
    onCancel: () => void;
}

const LinkForm = ({ data, onSubmit, onCancel }: LinkFormProps) => {
    return (
        <div data-testid="pb.page.list.menu.item.form">
            <Form data={data} onSubmit={onSubmit}>
                {({ Bind, submit, data: formData }) => (
                    <>
                        <Grid>
                            <Grid.Column span={12}>
                                <Heading level={6}>Page list menu item</Heading>
                            </Grid.Column>
                            <Grid.Column span={12} data-testid="pb.menu.new.listitem.title.grid">
                                <Bind name="title" validators={validation.create("required")}>
                                    <Input
                                        size={"lg"}
                                        label="Title"
                                        data-testid="pb.menu.new.listitem.title"
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind name="category" validators={validation.create("required")}>
                                    <CategoriesAutocomplete
                                        label="Category"
                                        data-testid="pb.menu.new.listitem.category"
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={6}>
                                <Bind
                                    name="sortBy"
                                    defaultValue={"publishedOn"}
                                    validators={validation.create("required")}
                                >
                                    <Select
                                        size={"lg"}
                                        label="Sort by..."
                                        data-testid="pb.menu.new.listitem.sortby"
                                        options={[
                                            { label: "Published on", value: "publishedOn" },
                                            { label: "Title", value: "title" }
                                        ]}
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={6}>
                                <Bind
                                    name="sortDir"
                                    defaultValue={"desc"}
                                    validators={validation.create("required")}
                                >
                                    <Select
                                        size={"lg"}
                                        label="Sort direction..."
                                        data-testid="pb.menu.new.listitem.sortdirection"
                                        options={[
                                            { label: "Ascending", value: "asc" },
                                            { label: "Descending", value: "desc" }
                                        ]}
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind name="tags">
                                    <TagsMultiAutocomplete data-testid="pb.menu.new.listitem.tags" />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                {formData.tags && formData.tags.length > 0 && (
                                    <Bind
                                        name="tagsRule"
                                        defaultValue={"all"}
                                        validators={validation.create("required")}
                                    >
                                        <Select
                                            size={"lg"}
                                            label="Tags rule..."
                                            data-testid="pb.menu.new.listitem.tagsrule"
                                            options={[
                                                { label: "Must include all tags", value: "all" },
                                                {
                                                    label: "Must include any of the tags",
                                                    value: "any"
                                                }
                                            ]}
                                        />
                                    </Bind>
                                )}
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <div className={"wby-flex wby-justify-end wby-gap-sm"}>
                                    <Button
                                        variant={"secondary"}
                                        text={"Cancel"}
                                        onClick={onCancel}
                                        data-testid="pb.menu.new.listitem.button.cancel"
                                    />
                                    <Button
                                        text={"Save menu item"}
                                        onClick={ev => {
                                            submit(ev);
                                        }}
                                        data-testid="pb.menu.new.listitem.button.save"
                                    />
                                </div>
                            </Grid.Column>
                        </Grid>
                    </>
                )}
            </Form>
        </div>
    );
};

export default LinkForm;
