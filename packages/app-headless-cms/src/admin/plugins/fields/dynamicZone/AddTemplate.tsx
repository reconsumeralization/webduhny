import React, { useState } from "react";
import { CmsDynamicZoneTemplate } from "~/types";
import { TemplateDialog } from "./TemplateDialog";
import { ReactComponent as InfoIcon } from "@webiny/icons/info.svg";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as AddCircleIcon } from "@webiny/icons/add_circle_outline.svg";
import { Button, Icon, Text, IconButton, Link } from "@webiny/admin-ui";

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
                "wby-flex wby-flex-col wby-gap-sm-extra wby-p-xl wby-pb-lg wby-border-sm wby-border-neutral-dimmed wby-rounded"
            }
        >
            <div className={"wby-w-full wby-text-center"}>
                {showTemplateDialog ? (
                    <TemplateDialog onTemplate={onTemplate} onClose={onDialogClose} />
                ) : null}
                <Button
                    variant={"secondary"}
                    onClick={addTemplate}
                    text={"Add a template"}
                    icon={<AddIcon />}
                />
            </div>
            <div className={"wby-flex wby-items-center wby-justify-center wby-gap-xs"}>
                <Icon icon={<InfoIcon />} label={"Info"} size={"sm"} color={"neutral-light"} />
                <Text size={"sm"}>
                    <Link to={"http://webiny.link/admin/how-to-use/dynamic-zones"}>Click here</Link>{" "}
                    to learn how templates and dynamic zones work
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
            <IconButton
                onClick={addTemplate}
                icon={<AddCircleIcon />}
                size={"lg"}
                variant={"ghost"}
            />
        </div>
    );
};
