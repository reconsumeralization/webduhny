import React from "react";
import { useFormEditor } from "../../Context";
import { Form } from "../../../../../components/Form";

export const PreviewTab = () => {
    const { data } = useFormEditor();

    return <Form preview data={data} />;
};
