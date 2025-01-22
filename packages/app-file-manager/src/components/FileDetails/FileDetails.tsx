import React, { useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import noop from "lodash/noop";
// @ts-expect-error This package has no types.
import { useHotkeys } from "react-hotkeyz";
import styled from "@emotion/styled";
import { FileItem } from "@webiny/app-admin/types";
import { Form, FormAPI, FormOnSubmit } from "@webiny/form";
import { prepareFormData } from "@webiny/app-headless-cms-common";
import { DrawerRight } from "@webiny/ui/Drawer";
import { CircularProgress } from "@webiny/ui/Progress";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Tab, Tabs } from "@webiny/ui/Tabs";
import { FileDetailsProvider } from "~/components/FileDetails/FileDetailsProvider";
import { Preview } from "./components/Preview";
import { PreviewMeta } from "./components/PreviewMeta";
import { Actions } from "./components/Actions";
import { Content } from "./components/Content";
import { SimpleForm } from "@webiny/app-admin/components/SimpleForm";
import { Extensions } from "./components/Extensions";
import { useFileModel } from "~/hooks/useFileModel";
import { useFileManagerViewConfig } from "~/index";
import { FileProvider } from "~/contexts/FileProvider";
import { ButtonDefault, ButtonPrimary } from "@webiny/ui/Button";

const FormContainer = styled(SimpleForm)`
    margin: 0;
`;

interface FileDetailsInnerProps {
    file: FileItem;
    onForm: (form: FormAPI) => void;
    onClose: () => void;
    onSubmit: (fileData: FileItem) => void;
}

const FileDetailsInner = ({ file, onForm, ...props }: FileDetailsInnerProps) => {
    const formRef = React.createRef<FormAPI>();

    useEffect(() => {
        if (formRef.current) {
            onForm(formRef.current);
        }
    }, []);

    const fileModel = useFileModel();
    const { fileDetails } = useFileManagerViewConfig();

    const [, leftPanel = "1", rightPanel = "1"] = fileDetails.width.split(",");

    const extensionFields = useMemo(() => {
        const fields = fileModel.fields.find(field => field.fieldId === "extensions");
        if (!fields?.settings?.fields) {
            return [];
        }
        return fields?.settings?.fields || [];
    }, [fileModel]);

    const onSubmit: FormOnSubmit<FileItem> = async data => {
        const fileData = prepareFormData(data, fileModel.fields);
        props.onSubmit({ ...file, ...fileData });
    };

    const basicFieldsElement = (
        <Grid>
            {fileDetails.fields.map(field => (
                <Cell span={12} key={field.name}>
                    {field.element}
                </Cell>
            ))}
        </Grid>
    );

    const extensionFieldsElement =
        extensionFields.length > 0 ? <Extensions model={fileModel} /> : null;

    return (
        <Form data={file} onSubmit={onSubmit} ref={formRef}>
            {() => (
                <FormContainer>
                    <Content>
                        <Content.Panel flex={parseFloat(leftPanel)}>
                            <Actions />
                            <Preview />
                            <PreviewMeta />
                        </Content.Panel>
                        <Content.Panel flex={parseFloat(rightPanel)}>
                            {fileDetails.groupFields ? (
                                <Tabs>
                                    <Tab label={"Basic Details"}>{basicFieldsElement}</Tab>
                                    <Tab label={"Advanced Details"}>{extensionFieldsElement}</Tab>
                                </Tabs>
                            ) : (
                                <>
                                    {basicFieldsElement}
                                    {extensionFieldsElement}
                                </>
                            )}
                        </Content.Panel>
                    </Content>
                </FormContainer>
            )}
        </Form>
    );
};

function getPortalTarget() {
    let target = window.document.getElementById("file-details-drawer");
    if (!target) {
        target = document.createElement("div");
        target.setAttribute("id", "file-details-drawer");
        document.body && document.body.appendChild(target);
    }
    return target;
}

interface FileDetailsPortalProps {
    children: React.ReactNode;
}

const FileDetailsPortal = ({ children }: FileDetailsPortalProps) => {
    const containerRef = useRef<HTMLElement>(getPortalTarget());

    return ReactDOM.createPortal(children, containerRef.current);
};

export interface FileDetailsProps {
    file?: FileItem;
    open: boolean;
    loading: string | null;
    onClose: () => void;
    onSave: (file: FileItem) => void;
    onSetFile?: (file: FileItem) => void;
}

export const FileDetails = ({
    open,
    onClose,
    onSave,
    loading,
    file,
    onSetFile = noop
}: FileDetailsProps) => {
    useHotkeys({
        zIndex: 55,
        disabled: !open,
        keys: {
            esc: onClose
        }
    });

    const { fileDetails } = useFileManagerViewConfig();

    const drawerWidth = fileDetails.width.split(",")[0];

    const formRef = useRef<FormAPI | null>(null);

    return (
        <FileDetailsPortal>
            <DrawerRight
                title={"File Details"}
                width={drawerWidth}
                open={open}
                className={"z-50"}
                onClose={onClose}
                data-testid={"fm.file-details.drawer"}
                actions={
                    <>
                        <ButtonDefault onClick={onClose}>Cancel</ButtonDefault>
                        <ButtonPrimary onClick={() => formRef.current?.submit()}>
                            Save File
                        </ButtonPrimary>
                    </>
                }
            >
                {loading && <CircularProgress label={loading} />}
                {file && (
                    <FileProvider file={file}>
                        <FileDetailsProvider hideFileDetails={onClose} onSetFile={onSetFile}>
                            <FileDetailsInner
                                onForm={form => {
                                    formRef.current = form;
                                }}
                                file={file}
                                onClose={onClose}
                                onSubmit={onSave}
                            />
                        </FileDetailsProvider>
                    </FileProvider>
                )}
            </DrawerRight>
        </FileDetailsPortal>
    );
};
