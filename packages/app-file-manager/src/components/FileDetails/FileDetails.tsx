import React, { useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import noop from "lodash/noop";
// @ts-expect-error This package has no types.
import { useHotkeys } from "react-hotkeyz";
import { Drawer, Grid, OverlayLoader, Tabs } from "@webiny/admin-ui";
import { FileItem } from "@webiny/app-admin/types";
import { Form, FormAPI, FormOnSubmit } from "@webiny/form";
import { prepareFormData } from "@webiny/app-headless-cms-common";
import { FileDetailsProvider } from "~/components/FileDetails/FileDetailsProvider";
import { Preview } from "./components/Preview";
import { Actions } from "./components/Actions";
import { Content } from "./components/Content";
import { Extensions } from "./components/Extensions";
import { Description } from "./components/Description";
import { useFileModel } from "~/hooks/useFileModel";
import { useFileManagerViewConfig } from "~/index";
import { FileProvider } from "~/contexts/FileProvider";

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
                <Grid.Column span={12} key={field.name}>
                    {field.element}
                </Grid.Column>
            ))}
        </Grid>
    );

    const extensionFieldsElement =
        extensionFields.length > 0 ? <Extensions model={fileModel} /> : null;

    return (
        <Form data={file} onSubmit={onSubmit} ref={formRef}>
            {() => (
                <Content>
                    <Content.Panel flex={parseFloat(leftPanel)}>
                        <div
                            className={
                                "wby-flex wby-flex-col wby-justify-between wby-gap-md wby-h-full wby-px-lg wby-py-md"
                            }
                        >
                            <Actions />
                            <Preview />
                        </div>
                    </Content.Panel>
                    <Content.Panel flex={parseFloat(rightPanel)}>
                        {fileDetails.groupFields ? (
                            <Tabs
                                size={"md"}
                                spacing={"lg"}
                                separator={true}
                                tabs={[
                                    <Tabs.Tab
                                        key={"basic-details"}
                                        value={"basic-details"}
                                        trigger={"Basic details"}
                                        content={basicFieldsElement}
                                    />,
                                    <Tabs.Tab
                                        key={"advanced-details"}
                                        value={"advanced-details"}
                                        trigger={"Advanced details"}
                                        content={extensionFieldsElement}
                                    />
                                ]}
                            />
                        ) : (
                            <div className={"wby-p-lg"}>
                                {basicFieldsElement}
                                <div className={"wby-mt-lg"}>{extensionFieldsElement}</div>
                            </div>
                        )}
                    </Content.Panel>
                </Content>
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
        zIndex: 50,
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
            {file && (
                <FileProvider file={file}>
                    <Drawer
                        title={file.name}
                        description={<Description />}
                        width={drawerWidth}
                        open={open}
                        modal={true}
                        bodyPadding={false}
                        headerSeparator={true}
                        footerSeparator={true}
                        onClose={onClose}
                        data-testid={"fm.file-details.drawer"}
                        actions={
                            <>
                                <Drawer.CancelButton text={"Cancel"} />
                                <Drawer.ConfirmButton
                                    text={"Update"}
                                    onClick={() => formRef.current?.submit()}
                                />
                            </>
                        }
                    >
                        {loading && <OverlayLoader text={loading} />}
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
                    </Drawer>
                </FileProvider>
            )}
        </FileDetailsPortal>
    );
};
