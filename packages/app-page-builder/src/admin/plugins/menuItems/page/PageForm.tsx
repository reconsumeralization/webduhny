import * as React from "react";
import { Form } from "@webiny/form";
import { PagesAutocomplete } from "~/admin/components/PagesAutocomplete";
import { validation } from "@webiny/validation";
import { FormOnSubmit } from "@webiny/form/types";
import { MenuTreeItem } from "~/admin/views/Menus/types";
import { Button, Grid, Heading, Input } from "@webiny/admin-ui";

interface LinkFormProps {
    data: MenuTreeItem;
    onSubmit: FormOnSubmit;
    onCancel: () => void;
}
const LinkForm = ({ data, onSubmit, onCancel }: LinkFormProps) => {
    return (
        <Form data={data} onSubmit={onSubmit}>
            {({ submit, Bind, data, form }) => (
                <Grid>
                    <Grid.Column span={12}>
                        <Heading level={6}>Page menu item</Heading>
                    </Grid.Column>
                    <Grid.Column span={12}>
                        <Bind name="page" validators={validation.create("required")}>
                            {({ onChange, ...rest }) => (
                                <PagesAutocomplete
                                    {...rest}
                                    onChange={(value: string, selection: MenuTreeItem) => {
                                        onChange(value);
                                        if (!data.title && selection) {
                                            form.setValue("title", selection.title);
                                        }
                                    }}
                                    label="Page"
                                    data-testid="pb.menu.new.pageitem.page"
                                />
                            )}
                        </Bind>
                    </Grid.Column>
                    <Grid.Column span={12}>
                        <Bind name="title" validators={validation.create("required")}>
                            <Input
                                size={"lg"}
                                label="Title"
                                data-testid="pb.menu.new.pageitem.title"
                            />
                        </Bind>
                    </Grid.Column>
                    <Grid.Column span={12}>
                        <div className={"wby-flex wby-justify-end wby-gap-sm"}>
                            <Button variant={"secondary"} text={"Cancel"} onClick={onCancel} />
                            <Button
                                text={"Save menu item"}
                                onClick={ev => {
                                    submit(ev);
                                }}
                                data-testid="pb.menu.new.pageitem.button.save"
                            />
                        </div>
                    </Grid.Column>
                </Grid>
            )}
        </Form>
    );
};

export default LinkForm;
