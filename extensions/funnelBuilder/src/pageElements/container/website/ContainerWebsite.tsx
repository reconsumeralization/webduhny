import React from "react";
import { createRenderer, useRenderer, Elements } from "@webiny/app-page-builder-elements";
import { Form } from "@webiny/form";

export const ContainerWebsite = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement();

    return (
        <Form
            onSubmit={data => {
                console.log("Form submitted");
                console.log("dejta", data);
            }}
        >
            {() => <Elements element={element} />}
        </Form>
    );
});
