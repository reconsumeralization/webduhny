import React, { useCallback, useState } from "react";
import dotProp from "dot-prop-immutable";
import { Button, Grid, Input, Text } from "@webiny/admin-ui";
import { i18n } from "@webiny/app/i18n";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { Form } from "@webiny/form";
import { useUi } from "@webiny/app/hooks/useUi";
import { validation } from "@webiny/validation";
import { WrapperWithFileUpload } from "../index";
// assets
import { ReactComponent as UploadFileIcon } from "@webiny/icons/file_upload.svg";
import { ReactComponent as LinkIcon } from "@webiny/icons/link.svg";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/importTemplate");

export const importTemplateDialogTitle = t`Import template`;

interface ImportTemplateDialogContentProps {
    onFileLink: (url: string) => void;
}

export const ImportTemplateDialogContent = ({ onFileLink }: ImportTemplateDialogContentProps) => {
    const ui = useUi();
    const [showLink, setShowLink] = useState<boolean>(false);

    const setDialogStyles = useCallback(() => {
        // Update the dialog options style to hide the dialog.
        ui.setState(state => dotProp.set(state, "dialog.options.style", { display: "none" }));

        // Get the overlay element and the body element.
        const overlay = document.getElementById("wby-admin-ui.dialog-overlay");
        const body = document.body;

        // If the overlay exists, hide it and make the body clickable.
        if (overlay) {
            overlay.style.visibility = "hidden";
            overlay.style.pointerEvents = "none";
            body.style.pointerEvents = "auto";
        }
    }, [ui]);

    const restoreDialogStyles = useCallback(() => {
        // Get the overlay element and the body element.
        const overlay = document.getElementById("wby-admin-ui.dialog-overlay");
        const body = document.body;

        // If the overlay exists, hide it and make the body clickable.
        if (overlay) {
            overlay.style.visibility = "visible";
            overlay.style.pointerEvents = "auto";
            body.style.pointerEvents = "none";
        }
    }, [ui]);

    const closeDialog = useCallback(() => {
        ui.setState(state => ({ ...state, dialog: null }));
    }, [ui]);

    return (
        <div className={"wby-pb-lg"}>
            <Text as={"div"} className={"wby-mb-lg"}>
                {t`You can import template(s) by either uploading a Webiny Template Export ZIP or by pasting export file URL.`}
            </Text>
            {showLink ? (
                <Form
                    data={{ url: "" }}
                    onSubmit={data => {
                        closeDialog();
                        onFileLink(data["url"]);
                    }}
                >
                    {({ Bind, submit }) => (
                        <Grid>
                            <Grid.Column span={12}>
                                <Bind name={"url"} validators={validation.create("required,url")}>
                                    <Input
                                        description={t`The URL has to be public. We'll use it to download the export template data file.`}
                                        label={"File URL"}
                                        data-testid={"import-templates.input-dialog.input-url"}
                                        size={"lg"}
                                    />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12} className={"wby-text-right"}>
                                <Button
                                    text={"Import"}
                                    onClick={ev => {
                                        submit(ev);
                                    }}
                                />
                            </Grid.Column>
                        </Grid>
                    )}
                </Form>
            ) : (
                <div className={"wby-flex wby-items-center wby-gap-md"}>
                    <WrapperWithFileUpload
                        onSelect={file => {
                            restoreDialogStyles();
                            onFileLink(file);
                        }}
                    >
                        {({ showFileManager }) => (
                            <Button
                                text={"Upload file"}
                                icon={<UploadFileIcon />}
                                variant={"secondary"}
                                onClick={() => {
                                    showFileManager();
                                    setDialogStyles();
                                }}
                            />
                        )}
                    </WrapperWithFileUpload>
                    <Text size={"sm"}>{t`OR`}</Text>
                    <Button
                        text={"Paste file URL"}
                        icon={<LinkIcon />}
                        variant={"secondary"}
                        onClick={() => setShowLink(true)}
                    />
                </div>
            )}
        </div>
    );
};

const useImportTemplateDialog = () => {
    const { showDialog } = useDialog();

    return {
        showImportTemplateDialog: (onFileLink?: (url: string) => void) => {
            showDialog(
                <ImportTemplateDialogContent
                    onFileLink={url => {
                        if (!onFileLink) {
                            return;
                        }
                        onFileLink(url);
                    }}
                />,
                {
                    title: importTemplateDialogTitle,
                    actions: {},
                    dataTestId: "import-templates.input-dialog"
                }
            );
        }
    };
};

export default useImportTemplateDialog;
