import React, { useState } from "react";
import { CmsDynamicZoneTemplate } from "~/types";
import { TemplateDialog } from "./TemplateDialog";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as AddCircleIcon } from "@webiny/icons/add_circle_outline.svg";
import { Button, Text, IconButton, Link, Tooltip } from "@webiny/admin-ui";

interface AddTemplateProps {
    onTemplate: UseAddTemplateParams["onTemplate"];
}

interface UseAddTemplateParams {
    onTemplate: (template: CmsDynamicZoneTemplate) => void;
}

function useAddTemplate(params: UseAddTemplateParams) {
    const [showTemplateDialog, setShowTemplateDialog] = useState(false);

    const addTemplate = () => {
        setShowTemplateDialog(true);
    };

    const onTemplate = (template: CmsDynamicZoneTemplate) => {
        params.onTemplate(template);
    };

    const onDialogClose = () => {
        setShowTemplateDialog(false);
    };

    return {
        addTemplate,
        onTemplate,
        onDialogClose,
        showTemplateDialog
    };
}

export const AddTemplateButton = (props: AddTemplateProps) => {
    const { addTemplate, onTemplate, showTemplateDialog, onDialogClose } = useAddTemplate({
        onTemplate: props.onTemplate
    });

    return (
        <div
            className={
                "wby-flex wby-flex-col wby-px-xl wby-pt-xl wby-pb-lg wby-gap-sm wby-border-sm wby-border-neutral-muted wby-rounded"
            }
        >
            <div className={"wby-w-full wby-text-center"}>
                {showTemplateDialog ? (
                    <TemplateDialog onTemplate={onTemplate} onClose={onDialogClose} />
                ) : null}
                <Button
                    size={"sm"}
                    variant={"secondary"}
                    onClick={addTemplate}
                    text={"Add template"}
                    icon={<AddIcon />}
                />
            </div>
            <div
                className={
                    "wby-flex wby-items-center wby-justify-center wby-gap-xs wby-w-full wby-mx-auto wby-text-center"
                }
            >
                <Text size={"sm"} className={"wby-text-neutral-strong"}>
                    <Link
                        to={"http://webiny.link/admin/how-to-use/dynamic-zones"}
                        target={"_blank"}
                    >
                        Learn how
                    </Link>{" "}
                    templates and dynamic zones work.
                </Text>
            </div>
        </div>
    );
};

export const AddTemplateIcon = (props: AddTemplateProps) => {
    const { addTemplate, onTemplate, showTemplateDialog, onDialogClose } = useAddTemplate({
        onTemplate: props.onTemplate
    });

    return (
        <div className={"wby-w-full wby-text-center wby-mt-md"}>
            {showTemplateDialog ? (
                <TemplateDialog onTemplate={onTemplate} onClose={onDialogClose} />
            ) : null}
            <Tooltip
                content={"Add template"}
                trigger={
                    <IconButton
                        onClick={addTemplate}
                        icon={<AddCircleIcon />}
                        size={"lg"}
                        variant={"ghost"}
                    />
                }
            />
        </div>
    );
};
