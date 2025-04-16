import React from "react";
import { createRenderer, useRenderer, Elements } from "@webiny/app-page-builder-elements";
import { Form } from "@webiny/form";
import { ContainerProvider } from "../ContainerContext";

export const ContainerWebsite = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement();

    console.log('renderiram WEBSITE ❗❗❗❗')
    return (
        <div>
            <ContainerProvider>
                <Form
                    onSubmit={data => {
                        console.log("Form submitted");
                        console.log("dejta", data);
                    }}
                >
                    {() => <Elements element={element} />}
                </Form>
            </ContainerProvider>
        </div>
    );
});
