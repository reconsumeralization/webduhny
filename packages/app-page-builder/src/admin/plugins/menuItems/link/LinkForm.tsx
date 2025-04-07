import * as React from "react";
import { Form } from "@webiny/form";
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
            {({ submit, Bind }) => (
                <Grid>
                    <Grid.Column span={12}>
                        <Heading level={6}>Link menu item</Heading>
                    </Grid.Column>
                    <Grid.Column span={12}>
                        <Bind name="title" validators={validation.create("required")}>
                            <Input size={"lg"} label="Title" data-testid="pb.menu.new.link.title" />
                        </Bind>
                    </Grid.Column>
                    <Grid.Column span={12}>
                        <Bind
                            name="url"
                            validators={validation.create("required,url:allowRelative:allowHref")}
                        >
                            <Input size={"lg"} label="URL" data-testid="pb.menu.new.link.url" />
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
                                data-testid="pb.menu.new.link.button.save"
                            />
                        </div>
                    </Grid.Column>
                </Grid>
            )}
        </Form>
    );
};

export default LinkForm;
